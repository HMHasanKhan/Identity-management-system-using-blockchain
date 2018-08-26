import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../shared/web3.service';
function hexToString (hex) {
	var string = '';
	for (var i = 0; i < hex.length; i += 2) {
	  string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return string;
  }

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  Aqr:any;
	
	// //gid: number;
	output: any;
	// name: string;
	// age: number;
	// pAddress:string;
	// ad: string;
	
	constructor(private web3Service: Web3Service) { }
	

	

	createAccount(name: string, pw: string, city: string, country : string, email: string, DOB,string){
		
		this.web3Service.SimpleContract.deployed().then((instance) => {
			
			return instance.createUserAccount(name,pw,city, country,email, DOB ,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
		}).then((result)=>{
			
      this.Aqr = result.logs[0].args.AllotedAddress;// 
      console.log(this.Aqr);
      document.getElementById("insert").innerHTML = this.Aqr;
		});
    document.getElementById("qr").style.visibility="visible"
    document.getElementById("su").style.visibility="hidden"
    
		}

  ngOnInit() {
  }

}
