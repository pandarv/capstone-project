import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import authService from "../api-authorization/AuthorizeService";
import axios from "axios";
import "./AddNewClient-Style.css";


export const AddNewClientForm = () => {
	
	const formInputValue = {
		CompanyName: "", Address: "", Phone: "", CPFirstName: "", CPLastName: "", CPEMail: "", StartDate: "", EndDate: "", SubscriptionStatus: "", PackageName:"", PermissionLevel:""
			};
	const [inputValue, setInputValue] = useState(formInputValue);
	
	const submitHandler = async (e) => {
		e.preventDefault();
			

		var tempDate = new Date();
		tempDate = tempDate.getFullYear() + "-" + (tempDate.getMonth()+1) + "-" + tempDate.getDate();

		var futureDate = new Date();
		futureDate = (futureDate.getFullYear() + 1) + "-" + (futureDate.getMonth() + 1) + "-" + futureDate.getDate();
		//alert("This is Date.now: " + Date.now()); //returns milliseconds

		//alert("This is inputvalue.startdate: "+ inputValue.StartDate+ " ; this is tempdate: "+ tempDate); //returns date
		//alert("Today's date plus one year: " + futureDate + " Start Year: " + inputValue.StartDate);

		if ((inputValue.CompanyName).trim() === "") {
			alert("Please enter a name for the company.");
			document.getElementById("CompanyName").focus();
			document.getElementById("CompanyName").scrollIntoView({behaviour: "smooth"});
		}

		else if ((inputValue.Address).trim() === "") {
			alert("Please enter an address for the company.");
			document.getElementById("address").focus();
		}

		else if ((inputValue.Address).length <= 10) {
			alert("Please enter an address with at least 10 characters for the company.");
			document.getElementById("address").focus();
		}
		else if ((inputValue.Phone).trim() === "" || (inputValue.Phone).length !=10) {
			alert("Please enter a 10 digit phone number for the company.");
			document.getElementById("phoneNumber").focus();
		}
		else if (isNaN(inputValue.Phone)) {
			alert("Please enter a 10 digit phone number for the company consisting of only numbers.");
			document.getElementById("phoneNumber").focus();
		}
		else if ((inputValue.CPFirstName).trim() === "") {
			alert("Please enter a Contact Person first name for the company.");
			document.getElementById("firstName").focus();
		}
		else if ((inputValue.CPLastName).trim() === "") {
			alert("Please enter a Contact Person last name for the company.");
			document.getElementById("lastName").focus();
		}
		else if ((inputValue.CPEMail).trim() === "") {
			alert("Please enter a Contact Person email for the company.");
			document.getElementById("CPEMail").focus();
		}
		else if (!checkEmail(inputValue.CPEMail)) {
			alert("Please enter an email with at least 6 characters, and includes the '@' symbol.");
			document.getElementById("CPEmail").focus();
		}

		else if ((inputValue.PackageName.length) == 0) {
			alert("Please select a Package Type for the company");
			document.getElementById("PackageType").focus();
		}
		else if ((inputValue.StartDate).trim() === "") {
			alert("Please select a Start Date for the company");
			document.getElementById("StartDate").focus();
		}
		else if ((inputValue.EndDate).trim() === "") {
			alert("Please select an End Date for the company");
			document.getElementById("EndDate").focus();
		}
		else if ((inputValue.StartDate).trim() >= (inputValue.EndDate).trim()) {
			alert("Please enter an end date that is AFTER the start date.");
			document.getElementById("EndDate").focus();
		}
		else if (inputValue.StartDate < tempDate) {
			alert("Please select a Start Date equal to or later than today's date of " + tempDate);
			document.getElementById("StartDate").focus();
		}
		else if (inputValue.StartDate > futureDate) {
			alert("Please select a Start Date no more than 1 year into the future from today's date of " + tempDate);
			document.getElementById("StartDate").focus();
		}
		else if ((inputValue.SubscriptionStatus).trim() === "") {
			alert("Please select a Subscription Status for the company");
			document.getElementById("SubscriptionStatus").focus();
		}
		else if ((inputValue.PermissionLevel).trim() === "")
		{
			alert("Please select a Permission Level for the company");
			document.getElementById("PermissionLevel").focus();
		}
		else
		{ 
			console.log(setInputValue);
			try
			{
				let urlParams =
				{
					newCompanyName: inputValue.CompanyName,
					newAddress: inputValue.Address,
					newPhone: inputValue.Phone,
					newCPFirstName: inputValue.CPFirstName,
					newCPLastName: inputValue.CPLastName,
					newCPEMail: inputValue.CPEMail,
					newStartDate: inputValue.StartDate,
					newEndDate: inputValue.EndDate,
					newSubscriptionStatus: inputValue.SubscriptionStatus,
					newPackageName: inputValue.PackageName,
					newPermissionLevel: inputValue.PermissionLevel
				};
		
		 //const token = await authService.getAccessToken();
		 
		  const resp = await fetch(`api/registeredit?` + new URLSearchParams(urlParams), {
			  method: "POST" });
				console.log(await resp.text());

				if (resp.ok)    //if we get a good response, send out a message letting the user know.
				{
					alert("The new company has been successfully added to the database.");

					//reset input fields to empty to prepare to accept another add.
				
					setInputValue({
						CompanyName: "",
						Address: "",
						Phone: "",
						CPFirstName: "",
						CPLastName: "",
						CPEMail: "",
						StartDate: "",
						EndDate: "",
						SubscriptionStatus: "",
						PackageName: "",
						PermissionLevel: "",
					});


				};				
			}
			catch (error){console.log(error.response);}
			
		}
	};
	const handleChange = (e) => {
		// console.log(`${e.target.name}: ${e.target.value}`);
		setInputValue((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const checkEmail = (emailInput) => {
		let validEmail = false;
		for (var i = 0; i <= emailInput.length; i++) {
			if (emailInput.charAt(i) == "@") { validEmail = true; }

		}
		return validEmail;

	}
	return (
		<section className="main-container">
			{/* <h1 className="heading-card">Add New Client Form</h1> */}
			<form onSubmit={submitHandler} className="form-container bg-color-prim">
				<h1 className="heading-form">Add New Client Form</h1>
				<div>
					<label htmlFor="CompanyName">Company Name *</label>
					<input type="text" name="CompanyName" id="CompanyName" placeholder="Company Name" value={inputValue.CompanyName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="Address">Address *</label>
					<input type="text" name="Address" id="address" placeholder="Address" value={inputValue.Address} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="phoneNumber">Phone Number *</label>
					<input type="phone" name="Phone" id="phoneNumber" maxLength="10" placeholder="Phone" value={inputValue.Phone} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="firstName">Contacts First Name *</label>
					<input type="text" name="CPFirstName" id="firstName" placeholder="First Name" value={inputValue.CPFirstName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="lastName">Contact Last Name *</label>
					<input type="text" name="CPLastName" id="lastName" placeholder="Last Name" value={inputValue.CPLastName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="CPEMail">Contacts Email *</label>
					<input type="email" name="CPEMail" id="CPEMail" placeholder="Client Email" value={inputValue.CPEMail} onChange={handleChange} />
				</div>
				
				 <div>
					<label htmlFor="PackageType">Package Type *</label>
					<select name="PackageName" id="PackageType" value={inputValue.PackageName} onChange={handleChange}>
						<option value="">Please select a Package Type</option>
						<option value="Micro Company (1-9)">Micro Company (1-9)</option>
						<option value="Small Company (10-49)">Small Company (10-49)</option>
						<option value="Medium Company (50-249)">Medium Company (50-249)</option>
						<option value="Large Company (250 +)">Large Company (250 +)</option>
					</select>
				</div>
				<div>
					<label htmlFor="startdate">Start Date *</label>
					<input type="date" name="StartDate" id="StartDate" placeholder="yyyy-mm-dd" value={inputValue.StartDate} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="enddate">End Date *</label>
					<input type="date" name="EndDate" id="EndDate" placeholder="yyyy-mm-dd" value={inputValue.EndDate} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="SubscriptionStatus">Subscription Status *</label>
					<select name="SubscriptionStatus" id="SubscriptionStatus" value={inputValue.SubscriptionStatus} onChange={handleChange}>
						<option value="">Please assign a Subscription Status</option>
						<option value="0">Inactive</option>
						<option value="1">Active</option>
					</select>
				</div>
				<div>
					<label htmlFor="PermissionLevel">Permission Level *</label>
					<select name="PermissionLevel" id="PermissionLevel" value={inputValue.PermissionLevel} onChange={handleChange}>
						<option value="">Please assign a Permission Level</option>
						<option value="1">Full Administrative Access</option>
						<option value="2">Client Level Access </option>
						
					</select>
				</div>
				<button className="but-general but-col-prim">Submit</button>
				<div className="marg-top">
					<NavLink to="/company" className="but-back but-col-sec">
						Back
					</NavLink>
				</div>
				{/* <button className="but-back but-col-sec">Back</button> */}
			</form>
		</section>
	);
};
