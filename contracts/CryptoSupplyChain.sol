// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CryptoSupplyChain is SepoliaConfig {
    using FHE for *;
    
    struct SupplyChainItem {
        euint32 itemId;
        euint32 quantity;
        euint32 unitPrice;
        euint32 totalValue;
        bool isVerified;
        bool isShipped;
        bool isDelivered;
        string name;
        string description;
        address supplier;
        address buyer;
        uint256 timestamp;
        uint256 deliveryDate;
    }
    
    struct Invoice {
        euint32 invoiceId;
        euint32 totalAmount;
        euint32 paidAmount;
        euint32 remainingAmount;
        bool isPaid;
        bool isVerified;
        string invoiceHash;
        address supplier;
        address buyer;
        uint256 dueDate;
        uint256 timestamp;
    }
    
    struct Payment {
        euint32 paymentId;
        euint32 amount;
        address payer;
        address recipient;
        uint256 timestamp;
        string paymentHash;
    }
    
    struct Supplier {
        euint32 reputation;
        euint32 totalTransactions;
        euint32 successfulDeliveries;
        bool isVerified;
        string companyName;
        address walletAddress;
    }
    
    mapping(uint256 => SupplyChainItem) public supplyChainItems;
    mapping(uint256 => Invoice) public invoices;
    mapping(uint256 => Payment) public payments;
    mapping(address => Supplier) public suppliers;
    mapping(address => euint32) public buyerReputation;
    
    uint256 public itemCounter;
    uint256 public invoiceCounter;
    uint256 public paymentCounter;
    
    address public owner;
    address public verifier;
    
    event ItemCreated(uint256 indexed itemId, address indexed supplier, string name);
    event InvoiceGenerated(uint256 indexed invoiceId, uint256 indexed itemId, address indexed supplier);
    event PaymentProcessed(uint256 indexed paymentId, uint256 indexed invoiceId, address indexed payer);
    event ItemShipped(uint256 indexed itemId, address indexed supplier);
    event ItemDelivered(uint256 indexed itemId, address indexed buyer);
    event SupplierVerified(address indexed supplier, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createSupplyChainItem(
        string memory _name,
        string memory _description,
        externalEuint32 _quantity,
        externalEuint32 _unitPrice,
        address _buyer,
        uint256 _deliveryDate,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Item name cannot be empty");
        require(_buyer != address(0), "Invalid buyer address");
        require(_deliveryDate > block.timestamp, "Delivery date must be in the future");
        
        uint256 itemId = itemCounter++;
        
        // Convert external encrypted values to internal
        euint32 quantity = FHE.fromExternal(_quantity, inputProof);
        euint32 unitPrice = FHE.fromExternal(_unitPrice, inputProof);
        euint32 totalValue = FHE.mul(quantity, unitPrice);
        
        supplyChainItems[itemId] = SupplyChainItem({
            itemId: FHE.asEuint32(0), // Will be set properly later
            quantity: quantity,
            unitPrice: unitPrice,
            totalValue: totalValue,
            isVerified: false,
            isShipped: false,
            isDelivered: false,
            name: _name,
            description: _description,
            supplier: msg.sender,
            buyer: _buyer,
            timestamp: block.timestamp,
            deliveryDate: _deliveryDate
        });
        
        // Update supplier info
        if (suppliers[msg.sender].walletAddress == address(0)) {
            suppliers[msg.sender] = Supplier({
                reputation: FHE.asEuint32(100), // Initial reputation
                totalTransactions: FHE.asEuint32(1),
                successfulDeliveries: FHE.asEuint32(0),
                isVerified: false,
                companyName: "",
                walletAddress: msg.sender
            });
        } else {
            suppliers[msg.sender].totalTransactions = FHE.add(suppliers[msg.sender].totalTransactions, FHE.asEuint32(1));
        }
        
        emit ItemCreated(itemId, msg.sender, _name);
        return itemId;
    }
    
    function generateInvoice(
        uint256 itemId,
        string memory _invoiceHash
    ) public returns (uint256) {
        require(supplyChainItems[itemId].supplier == msg.sender, "Only supplier can generate invoice");
        require(!supplyChainItems[itemId].isShipped, "Item already shipped");
        
        uint256 invoiceId = invoiceCounter++;
        
        SupplyChainItem storage item = supplyChainItems[itemId];
        
        invoices[invoiceId] = Invoice({
            invoiceId: FHE.asEuint32(0), // Will be set properly later
            totalAmount: item.totalValue,
            paidAmount: FHE.asEuint32(0),
            remainingAmount: item.totalValue,
            isPaid: false,
            isVerified: false,
            invoiceHash: _invoiceHash,
            supplier: msg.sender,
            buyer: item.buyer,
            dueDate: block.timestamp + 30 days, // 30 days payment terms
            timestamp: block.timestamp
        });
        
        emit InvoiceGenerated(invoiceId, itemId, msg.sender);
        return invoiceId;
    }
    
    function processPayment(
        uint256 invoiceId,
        externalEuint32 _amount,
        string memory _paymentHash,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(invoices[invoiceId].buyer == msg.sender, "Only buyer can make payment");
        require(!invoices[invoiceId].isPaid, "Invoice already paid");
        
        uint256 paymentId = paymentCounter++;
        
        euint32 amount = FHE.fromExternal(_amount, inputProof);
        
        payments[paymentId] = Payment({
            paymentId: FHE.asEuint32(0), // Will be set properly later
            amount: amount,
            payer: msg.sender,
            recipient: invoices[invoiceId].supplier,
            timestamp: block.timestamp,
            paymentHash: _paymentHash
        });
        
        // Update invoice payment status
        Invoice storage invoice = invoices[invoiceId];
        invoice.paidAmount = FHE.add(invoice.paidAmount, amount);
        invoice.remainingAmount = FHE.sub(invoice.totalAmount, invoice.paidAmount);
        
        // Check if fully paid
        ebool isFullyPaid = FHE.eq(invoice.remainingAmount, FHE.asEuint32(0));
        invoice.isPaid = FHE.decrypt(isFullyPaid);
        
        emit PaymentProcessed(paymentId, invoiceId, msg.sender);
        return paymentId;
    }
    
    function shipItem(uint256 itemId) public {
        require(supplyChainItems[itemId].supplier == msg.sender, "Only supplier can ship item");
        require(supplyChainItems[itemId].isVerified, "Item must be verified before shipping");
        
        supplyChainItems[itemId].isShipped = true;
        emit ItemShipped(itemId, msg.sender);
    }
    
    function deliverItem(uint256 itemId) public {
        require(supplyChainItems[itemId].buyer == msg.sender, "Only buyer can confirm delivery");
        require(supplyChainItems[itemId].isShipped, "Item must be shipped before delivery");
        
        supplyChainItems[itemId].isDelivered = true;
        
        // Update supplier reputation
        address supplier = supplyChainItems[itemId].supplier;
        suppliers[supplier].successfulDeliveries = FHE.add(suppliers[supplier].successfulDeliveries, FHE.asEuint32(1));
        
        // Update reputation based on successful delivery
        euint32 reputationIncrease = FHE.asEuint32(5);
        suppliers[supplier].reputation = FHE.add(suppliers[supplier].reputation, reputationIncrease);
        
        emit ItemDelivered(itemId, msg.sender);
    }
    
    function verifySupplier(address supplier, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify suppliers");
        require(suppliers[supplier].walletAddress != address(0), "Supplier does not exist");
        
        suppliers[supplier].isVerified = isVerified;
        emit SupplierVerified(supplier, isVerified);
    }
    
    function verifyItem(uint256 itemId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify items");
        require(supplyChainItems[itemId].supplier != address(0), "Item does not exist");
        
        supplyChainItems[itemId].isVerified = isVerified;
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        buyerReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getItemInfo(uint256 itemId) public view returns (
        string memory name,
        string memory description,
        uint8 quantity,
        uint8 unitPrice,
        uint8 totalValue,
        bool isVerified,
        bool isShipped,
        bool isDelivered,
        address supplier,
        address buyer,
        uint256 timestamp,
        uint256 deliveryDate
    ) {
        SupplyChainItem storage item = supplyChainItems[itemId];
        return (
            item.name,
            item.description,
            0, // FHE.decrypt(item.quantity) - will be decrypted off-chain
            0, // FHE.decrypt(item.unitPrice) - will be decrypted off-chain
            0, // FHE.decrypt(item.totalValue) - will be decrypted off-chain
            item.isVerified,
            item.isShipped,
            item.isDelivered,
            item.supplier,
            item.buyer,
            item.timestamp,
            item.deliveryDate
        );
    }
    
    function getInvoiceInfo(uint256 invoiceId) public view returns (
        uint8 totalAmount,
        uint8 paidAmount,
        uint8 remainingAmount,
        bool isPaid,
        bool isVerified,
        string memory invoiceHash,
        address supplier,
        address buyer,
        uint256 dueDate,
        uint256 timestamp
    ) {
        Invoice storage invoice = invoices[invoiceId];
        return (
            0, // FHE.decrypt(invoice.totalAmount) - will be decrypted off-chain
            0, // FHE.decrypt(invoice.paidAmount) - will be decrypted off-chain
            0, // FHE.decrypt(invoice.remainingAmount) - will be decrypted off-chain
            invoice.isPaid,
            invoice.isVerified,
            invoice.invoiceHash,
            invoice.supplier,
            invoice.buyer,
            invoice.dueDate,
            invoice.timestamp
        );
    }
    
    function getPaymentInfo(uint256 paymentId) public view returns (
        uint8 amount,
        address payer,
        address recipient,
        uint256 timestamp,
        string memory paymentHash
    ) {
        Payment storage payment = payments[paymentId];
        return (
            0, // FHE.decrypt(payment.amount) - will be decrypted off-chain
            payment.payer,
            payment.recipient,
            payment.timestamp,
            payment.paymentHash
        );
    }
    
    function getSupplierInfo(address supplier) public view returns (
        uint8 reputation,
        uint8 totalTransactions,
        uint8 successfulDeliveries,
        bool isVerified,
        string memory companyName,
        address walletAddress
    ) {
        Supplier storage supplierInfo = suppliers[supplier];
        return (
            0, // FHE.decrypt(supplierInfo.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(supplierInfo.totalTransactions) - will be decrypted off-chain
            0, // FHE.decrypt(supplierInfo.successfulDeliveries) - will be decrypted off-chain
            supplierInfo.isVerified,
            supplierInfo.companyName,
            supplierInfo.walletAddress
        );
    }
    
    function getBuyerReputation(address buyer) public view returns (uint8) {
        return 0; // FHE.decrypt(buyerReputation[buyer]) - will be decrypted off-chain
    }
}
