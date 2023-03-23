const test = ()=>{
    fetch("http://localhost:5000/notams",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        searchword}
        )}).then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}
const button = document.getElementById("request")
const input = document.getElementById("searchword")
let searchword = ""

button.addEventListener('click',()=>{
    test()
})
input.addEventListener('change',(e)=>{
    searchword=e.target.value
})

