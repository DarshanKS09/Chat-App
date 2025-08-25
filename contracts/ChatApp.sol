// SPDX-License_Identifier: MIT
pragma solidity >= 0.8;
contract ChatApp{

   struct user{
    string name;
    friend[] friends;
    mapping(address => bool) isFrd;
   }
   struct AllUsers{
    string name;
    address add;
   }
   struct friend{
    string name;
    address f_add;
   }
   struct message{
    uint time; 
    string msg;
    address sender;
   }
  mapping(address => user) userlist;
  mapping (bytes32 => message[]) allMessage;
  AllUsers[] getAllUsers;
   function checkUser(address _add) public view returns(bool){
    if(bytes(userlist[_add].name).length>0){
        return true;
    }
    return false;
   }
   
   function register(string calldata _name) external {
    require(checkUser(msg.sender) == false,"User already exists");
    require(bytes(_name).length>0,"Username cant be zero");
    userlist[msg.sender].name = _name;
    getAllUsers.push(AllUsers({
        name:_name,
        add:msg.sender
    }));
   }

   function getname(address _add)public view returns(string memory){
    require(checkUser(_add),"User not found");
    return userlist[_add].name;
   }

   function addfriend(address _frdAdd,string memory _name) external{
    require(checkUser(_frdAdd),"User not regsitered");
    require(checkUser(msg.sender),"Create an acc first");
    require(msg.sender!=_frdAdd,"Cannot add urself as friend");
    require(!userlist[msg.sender].isFrd[_frdAdd],"Friend already exists");//check already friends..
    userlist[msg.sender].friends.push(friend({  //adding new friend (caller to new frd )
        name:_name,
        f_add:_frdAdd
    }));
   userlist[msg.sender].isFrd[_frdAdd] = true;  //updating the istrue so that no multiple request for same address
   userlist[_frdAdd].friends.push(friend({  //same update in friend side
   name:userlist[msg.sender].name,
   f_add:msg.sender
   }));
   userlist[_frdAdd].isFrd[msg.sender] = true;  //....................||...............
   }
   

   function displayFrnds() external view returns(friend[] memory ){
    return userlist[msg.sender].friends;
   }

   function getChatCode(address _frd) public view returns(bytes32){
    require(bytes(userlist[msg.sender].name).length>0,"User not found");
    require(userlist[msg.sender].isFrd[_frd],"Not a friend of urs");
    if(msg.sender > _frd){
        return keccak256(abi.encodePacked(msg.sender,_frd));
    }
    else{
        return keccak256(abi.encodePacked(_frd,msg.sender));
    }
   }

   function sendMessage(address _FrdAdd,string calldata _msg) external {
    require(checkUser(msg.sender),"Register first");
    require(userlist[msg.sender].isFrd[_FrdAdd],"Not a frnd");
    bytes32 ChatCode = getChatCode(_FrdAdd);
    message memory newMsg = message(block.timestamp,_msg,msg.sender);
    allMessage[ChatCode].push(newMsg);
   }
   function displayMsg(bytes32 _code) external view returns(message[] memory){
    return allMessage[_code];
   }
   function displayUsers() public view returns(AllUsers[] memory){
    return getAllUsers;
   }

}