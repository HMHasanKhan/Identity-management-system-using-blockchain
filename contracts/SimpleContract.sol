pragma solidity ^0.4.24;

contract SimpleContract{
    uint public numberOfUserAccounts;
    uint public numberOfEndorserAccounts;
    
    event AllotedAddress(address AllotedAddress);
    event AllotedAddressEndorser(address AllotedAddressEndorser);
    
    constructor(){
        numberOfUserAccounts = 0;
        numberOfEndorserAccounts=0;
        
    }
    
    
    function createUserAccount(string name, string password, string city, string country,string email,string DOB) returns(address){
        
        address a = new User(true, name, password);
        AllotedAddress(a);
        User user = User(a);
        user.setCity(city);
        user.setCountry(country);
        user.setEmail(email);
        user.setDOB(DOB);
        numberOfUserAccounts++;
        
        return a;
    }
    
    
    function getDetails(address addr, string pw) returns(bool,string,string,string,string,string){
        User user = User(addr);
        if(keccak256(user.getPassordHash())==keccak256(keccak256(pw))){
            return (user.getTypeOfUser(),user.getName(),user.getEmail(),user.getDOB(),user.getCity(),user.getCountry());
        }
        else return(false,"","","","","");
        
    }
    
    address[] public Endorsers;
    address[] public AppliedEndorsementList;
    
    function createEndorser(string name, string pw)returns(address){
        address a = new User(false, name, pw);
        AllotedAddressEndorser(a);
        Endorsers.push(a);
        numberOfEndorserAccounts++;
        return a;
    }
    
    function applyForEndorsemntMain(address addr, string pw){
        User user = User(addr);
        if(keccak256(user.getPassordHash())==keccak256(keccak256(pw)) && user.getEndorsementStatus()==false){
        AppliedEndorsementList.push(user.applyForEndorsement());
            
        }
        
    }
    
    function Endorse(address addr, string pw){ // here endorsers address and pw are required
        User user = User(addr);
        if(keccak256(user.getPassordHash())==keccak256(keccak256(pw)) && user.getTypeOfUser()==false){
            uint arraySize = AppliedEndorsementList.length - 1;
            address a = AppliedEndorsementList[arraySize];
            User userU = User(a);
            userU.AddEndorsement(addr,true);
        }
    }
    
    //function for testing
    function createDefualtEndorsers(){
        createEndorser("Haady","123");
        createEndorser("Waleed","123");
        createEndorser("Hasan","123");
    }

    function getEndorserFromList(uint n) returns (address){
        if (n>Endorsers.length)
        throw;

        return Endorsers[n];

    }
    
    
    
}

contract User{
    bool typeOfUser; // true for User, false for endorser
    string name;
    string passwordHash;
    
    string city;
    string country;
    string email;
    string DOB;
    
    bool EndorsmentStatus;
    
    struct EndorsmentDetails{
        address EndorsedBy;
        bool Verified;
        
    }
    EndorsmentDetails[] public Endorsments;
    
    constructor(bool t, string n, string password){
        typeOfUser = t;
        name = n;
        passwordHash = password;
        EndorsmentStatus = false;
        
    }
    function setCity(string c){
        city = c;
    }
    function setCountry(string cntry){
        country = cntry;
    }
    function setEmail(string em){
        email = em;
    }
    function setDOB(string dob){
        DOB = dob;
        
    }
    
    function getPassordHash() returns(string){
        return bytes32toString(keccak256(passwordHash));
    }
    function getName() returns(string){
        return name;
    }
    function getCity() returns(string){
        return city;
    }
    function getCountry() returns(string){
        return country;
    }
    function getEmail() returns (string){
        return email;
    }
    function getDOB() returns( string ){
        return DOB;
    }
    function getEndorsementStatus() returns(bool){
        return EndorsmentStatus;
    }
    function getTypeOfUser()returns(bool){
        return typeOfUser;
    }
    
     function bytes32toString(bytes32 _bytes32) public constant returns(string){
        bytes memory bytesArray = new bytes(32);
        for(uint256 i; i<32;i++){
            bytesArray[i]=_bytes32[i];
        }
        return string(bytesArray);
    }
    
    function applyForEndorsement()returns(address){
        EndorsmentStatus = true;
        return this;
    }
    
    function AddEndorsement(address addr, bool v){
        Endorsments.push(EndorsmentDetails(addr,v));
    }
    
}
    
    
    

















// pragma solidity ^0.4.22;

// contract SimpleContract {

// 	    event showString(address AllotedAddress);
    
//     mapping (address => address) listofAccounts;

//     function createWallet(bytes32 name, bytes32 age, bytes32 pAddres)returns (string){
//         address a  = new Wallet(name, age, pAddres);
//         showString(a);
//         return toString(a);
//     }
        
//         function getData(address adr) payable returns(bytes32, bytes32, bytes32){
//             Wallet wallet = Wallet(adr);
            
            
            
//         return (wallet.getName(),wallet.getAge(),wallet.getAddress());
        
//     }

//     function toString(address x)private returns (string) {
//     bytes memory b = new bytes(20);
//     for (uint i = 0; i < 20; i++)
//         b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
//     return string(b);
//     }
    
// }
// contract Wallet{
//     event showStringWallet(bytes32 name, bytes32 age,bytes32 pAddress);
    
//     bytes32 name;
//     bytes32 age;
//     bytes32 pAddress;
    
//     function Wallet(bytes32 n, bytes32 a, bytes32 p){
//         showStringWallet(n, a, p);
//         name=n;
//         age=a;
//         pAddress=p;
        

//     }
    
//     function getName() returns(bytes32){
//         return name;
//     }
//     function getAge() returns(bytes32){
//         return age;
//     }
//     function getAddress() returns(bytes32){
//         return pAddress;
//     }
    
// }