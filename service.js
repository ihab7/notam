const test = () => {
  fetch("http://localhost:5000/notams/getNotams/startDate/2015-06-07T00:00", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    //   body: JSON.stringify({
    //     searchword}
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error(error);
    });
};

//add notam
const addNotam = (newNotam) => {
  fetch("http://localhost:5000/notams/addNotam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: newNotam,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error(error);
    });
};
//update notam
const updateNotam = (ntm) => {
  fetch(`http://localhost:5000/notams/${ntm.num_ntm}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: ntm,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error(error);
    });
};
//delete notam
const deleteNotam = (num_ntm) => {
  fetch(`http://localhost:5000/notams/${num_ntm}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error(error);
    });
};

const button = document.getElementById("myBTN");
const form = document.getElementById("myForm");
const formData = new FormData(form);

form.addEventListener("change", (e) => {
  formData.set(e.target.name, e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const jsonObject = {};

  for (let [key, value] of formData) {
    jsonObject[key] = value;
  }
  const jsonData = JSON.stringify(jsonObject);
  console.log(jsonData);
  addNotam(jsonData);
  form.reset();
});
button.addEventListener("click", (e) => {
  e.preventDefault();
  const jsonObject = {};

  for (let [key, value] of formData) {
    jsonObject[key] = value;
  }
  const jsonData = JSON.stringify(jsonObject);
  addNotam(jsonData);
});
