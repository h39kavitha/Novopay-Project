let userData = [{'name':'Alex', 'dob':'10-06-2000', 'place':'US', 'interest':'coding'},
{'name':'BOB','dob':'10-06-2000', 'place':'UK', 'interest':'Sports Coding'},
{'name':'Kavitha', 'dob':'9-01-1900','place':'India', 'interest':'cCoding Eating'},
{'name':'Jhon', 'dob':'10-02-2020','place':'Itali', 'interest':'Sports'},
{'name':'Vijay', 'dob':'2-16-2010','place':'Karnataka', 'interest':'Speach'}]

var rIndex, tableBody = document.getElementById("tableData");

userDataLoad(userData);


//es6 arrow function
const searchFun = () => {
    let filter = document.getElementById('serach-input').value.toUpperCase();
    let tr = tableBody.getElementsByTagName('tr');
    for(let i =0;i<tr.length;i++) {
        let td = tr[i].getElementsByTagName('td')[0];
        if(td){
            let textValue = td.textContent || td.innerHTML;
            if(textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ''
            } else {
                tr[i].style.display = 'none';
            }
        }
    }

}

function userDataLoad(userData) {
    console.log(JSON.parse(localStorage.getItem("userData")))
    if (JSON.parse(localStorage.getItem("userData"))) {
        userData = JSON.parse(localStorage.getItem("userData"))
    } else {
        userData = userData;
    }
    console.log(userData,'localstaore')
   const tableBody = document.getElementById("tableData");
   let htmlData = '';
   
   for(let i = 0 ; i<userData.length;i++) {
       htmlData += `<tr>
                        <td>${userData[i].name}</td>
                        <td>${userData[i].dob}</td>
                        <td>${calculate_age(new Date(userData[i].dob))}</td>
                        <td>${userData[i].place}</td>
                        <td>${userData[i].interest}</td>
                     </tr>`
   }
   tableBody.innerHTML = htmlData;
   selectedRowInput(); 
  }

  function addNewRecord() {
        let dob = document.myForm.dob.value;
        document.myForm.age.value = dob;
        const obj = {name:'',dob:'',age: '', place:'',interest:''}
        obj.name = document.myForm.fname.value;
        obj.age = document.myForm.dob.value;
        obj.dob = document.myForm.dob.value;
        obj.place = document.myForm.place.value;
        obj.interest = document.myForm.interest.value;
        userData.push(obj)
        localStorage.setItem("userData", JSON.stringify(userData));
        userDataLoad(userData);


  }

  function deleleRecord() {
    rIndex = rIndex -1;
    tableBody.deleteRow(rIndex)     ;
    document.getElementById('fname').value  = '';
    document.getElementById('age').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('place').value = '';
    document.getElementById('interest').value = ''; 
    localStorage.setItem("userData", JSON.stringify(userData));
    userDataLoad(userData);

  }
  function editRecord() {
        rIndex = rIndex-1;
        let name = document.getElementById('fname').value,
        dob = document.getElementById('dob').value,
        place = document.getElementById('place').value,
        interest = document.getElementById('interest').value;
        const age = calculate_age(new Date(document.getElementById('dob').value));
        tableBody.rows[rIndex].cells[0].innerHTML = name;  
        tableBody.rows[rIndex].cells[1].innerHTML = dob;  
    
        tableBody.rows[rIndex].cells[3].innerHTML = place;  
        tableBody.rows[rIndex].cells[4].innerHTML = interest;  
        const obj = {name:'',dob:'',age: '', place:'',interest:''}
        obj.name = document.myForm.fname.value;
        obj.age = calculate_age(new Date(document.getElementById('dob').value));
        obj.dob = document.myForm.dob.value;
        obj.place = document.myForm.place.value;
        obj.interest = document.myForm.interest.value;
        tableBody.rows[rIndex].cells[2].innerHTML = age;  
        userData[rIndex] = obj;
        localStorage.setItem("userData", JSON.stringify(userData));
        userDataLoad(userData);
    

    

    
}
function selectedRowInput() {
    for(var i =0;i<tableBody.rows.length;i++) {
        tableBody.rows[i].onclick = function() {
            // get slected row index
            rIndex = this.rowIndex;
            document.getElementById('fname').value = this.cells[0].innerHTML;
            document.getElementById('dob').value = this.cells[1].innerHTML;
            document.getElementById('age').value = this.cells[2].innerHTML;
            document.getElementById('place').value = this.cells[3].innerHTML;
            document.getElementById('interest').value = this.cells[4].innerHTML;
        }
    }
}
selectedRowInput(); 
function calculate_age(dobOfUser) { 
    const dob = dobOfUser ? dobOfUser : new Date(document.getElementById('dob').value);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    dobOfUser ? '' : document.getElementById('age').value = Math.abs(age_dt.getUTCFullYear() - 1970) 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
