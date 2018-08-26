import { Component, OnInit,ViewChild } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Web3Service } from '../shared/web3.service';
import value from '*.json';

function hexToString (hex) {
	var string = '';
	for (var i = 0; i < hex.length; i += 2) {
	  string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return string;
  }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  constructor(private web3Service: Web3Service) { }

  rqr: string ;
  output: any;
  name:string;
  email:string;
  DOB:string;
  city:string;
  country:string;
  typeOfUser:any;
  
  

  getDataA(add: string, pw: string){
    this.web3Service.SimpleContract.deployed().then((instance)=> {
        this.rqr = add.toString();
        
        console.log(add);
        return instance.getDetails.call(add,pw ,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
    }).then((result)=>{
        //console.log(result.logs[0]);
        console.log(result);
        // this.output = result.toString();
        // this.typeOfUser = result[0].toString();
        // this.name= result[1].toString();
        // this.email= result[2].toString();
        // this.DOB= result[3].toString();
        // this.city= result[4].toString();
        // this.country= result[5].toString();
        


          
        
    })
}
Apply(){
    var pw = prompt("Enter Password","123");

    this.web3Service.SimpleContract.deployed().then((instance)=>{
        instance.applyForEndorsemntMain(this.rqr,pw,{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
    })
}



  ngOnInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
        console.log(devices);
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
            if (device.kind.toString() === 'videoinput') {
                videoDevices.push(device);
            }
        }
        if (videoDevices.length > 0){
            let choosenDev;
            for (const dev of videoDevices){
                if (dev.label.includes('front')){
                    choosenDev = dev;
                    break;
                }
            }
            if (choosenDev) {
                this.qrScannerComponent.chooseCamera.next(choosenDev);
            } else {
                this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
            }
        }
        this.web3Service.SimpleContract.deployed().then((instance)=>{
            return instance.createEndorser("TestEndorser","123",{ from: this.web3Service.web3.eth.accounts[0], gas: 4472414});
        }).then((result)=>{
            console.log(result.logs[0].args.AllotedAddressEndorser);

        });
        
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
        this.rqr = result;
        console.log(this.rqr);
        var inputElement = <HTMLInputElement>document.getElementById("add");
        inputElement.value = this.rqr;
       

    
       
    });

    

  }

}
