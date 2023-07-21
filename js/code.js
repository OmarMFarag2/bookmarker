var linksArr = [];
var webName = document.getElementById("name");
var url = document.getElementById("url");
var nameFlag, urlFlag;
if (localStorage.length != 0) {
    linksArr = JSON.parse(localStorage.getItem("link"));
    DisplayData();
}
function display() {
    var link = {
        name: webName.value,
        Url: url.value
    }
    linksArr.push(link);
    localStorage.setItem("link", JSON.stringify(linksArr))
    DisplayData()
    clearInput()
}
function clearInput() {
    webName.value = "";
    url.value = "";
    document.getElementById("name").classList.remove("valid");   
    document.getElementById("url").classList.remove("valid");   
}
function deleteBookmark(index) {
    linksArr.splice(index, 1);
    localStorage.setItem("link", JSON.stringify(linksArr))
    DisplayData();
}
function DisplayData() {
    var container = ``;
    for (var i = 0; i < linksArr.length; i++) {
        container += `                
        <tr>
             <td>${i + 1}</td>
             <td>${linksArr[i].name}</td>
             <td><button type="" class="btn btn-success fw-medium"><a target="_blank"  href="https://${linksArr[i].Url}"><span><i class="fa-solid fa-eye pe-1"></i></span> Visit</a></button></td>
             <td><button onclick="deleteBookmark(${i})"class="btn btn-danger fw-medium"><span><i class="fa-solid fa-trash pe-1"></i></span> Delete</button></td>
         </tr>`
    }
    document.getElementById("row").innerHTML = container;
}
function validateInput() {
    if (nameFlag && urlFlag) {
        display()
        nameFlag=false;
        urlFlag=false;
    }
    else
        document.getElementById("box").style.display = "flex";
}
function validateName(input) {
    var namePattern = /^[a-zA-Z0-9]{3,}$/;
    nameFlag= testPattern(namePattern,input);
}
function validateUrl(input) {
    var urlPattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;
    urlFlag=testPattern(urlPattern,input)
}
function hide() {
    document.getElementById("box").style.display = "none";
}
function testPattern(pattern,inputTag){
    var flag=pattern.test(inputTag.value);
    if (flag) {
        inputTag.classList.add("valid");
        inputTag.classList.remove("invalid");

    }
    else {
        inputTag.classList.add("invalid");
        inputTag.classList.remove("valid");
    }
    return flag;
}