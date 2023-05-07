var circleSelect = document.getElementById("circleSelect");
var polygonSelect = document.getElementById("polygonSelect");
var circleInputs = document.getElementById("circleInputs");
var polygonInputs = document.getElementById("polygonInputs");
var addPointBtn = document.getElementById("addPointBtn");
var extraPoints = document.getElementById("extraPoints");
var submitBtn = document.getElementById("submitBtn");
var addedShapes = [];
circleSelect.addEventListener("change", function () {
  if (circleSelect.checked) {
    circleInputs.style.display = "block";
    polygonInputs.style.display = "none";
  }
});

polygonSelect.addEventListener("change", function () {
  if (polygonSelect.checked) {
    circleInputs.style.display = "none";
    polygonInputs.style.display = "block";
  }
});

addPointBtn.addEventListener("click", function () {
  var pointInput = document.createElement("div");
  pointInput.classList.add("input-group", "mb-2");
  pointInput.innerHTML =
    '<input type="text" class="form-control point-input" placeholder="Enter point"> \
      <div class="input-group-append"> \
      <button class="btn btn-outline-secondary delete-point" type="button">Delete</button> \
        </div>';
  extraPoints.appendChild(pointInput);

  var deleteBtn = pointInput.querySelector(".delete-point");
  deleteBtn.addEventListener("click", function () {
    pointInput.remove();
  });
});
const handlePoly = () => {
  const inputs = Array.from(polygonInputs.querySelectorAll("input"));
  let polyArray = [];
  inputs.map((input) => {
    let values = input.value.split(",");
    const value1 = values[0];
    const value2 = values[1];
    polyArray.push([eval(value1), eval(value2)]);
  });

  return polyArray;
};
const handleCircle = () => {
  const inputs = Array.from(circleInputs.querySelectorAll("input"));
  let centerInput = inputs[1].value;
  let radiusInput = inputs[0].value;
  let values = centerInput.split(",");
  return {
    center: [eval(values[0]), eval(values[1])],
    radius: eval(radiusInput),
  };
};

// const point = [
//   [36.3219, 08.2826],
//   [36.381, 08.4034],
//   [36.381, 09.0517],
//   [36.02, 08.4735],
// ];
var polygon = function (point) {
  L.polygon(point).addTo(previewCarte);
};

var circle = function (centre, radius) {
  L.circle(centre, radius).addTo(previewCarte);
};

// var content =
//   "<b>NOTAM N°</b><br>" +
//   '<br><br><button class="butt" onclick="removePolygon();">supprimer la zone</button><br>';
// var popup = L.popup().setContent(content);

// L.polygon.bindPopup(popup);

// function removePolygon() {
//   map.removeLayer(polygon);
// }

// function convertStringToArray(str) {
//   const arr = JSON.parse(str);
//   return arr;
// }

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (polygonSelect.checked) {
    var newPolygone = polygon(handlePoly());

    //addedShapes.push(newPolygone);
  } else {
    var newCircle = circle(handleCircle().center, {
      radius: handleCircle().radius,
    });

    // addedShapes.push(newCircle);
  }
  carte.eachLayer(function (layer) {
    if (layer instanceof L.Circle || layer instanceof L.Polygon) {
      addedShapes.push(layer);
    }
    addedShapes.map((shape) => {
      var content = "";
      // if (shape instanceof L.Circle)
      content =
        "<b>Centre :</b><br>" +
        shape.center +
        "<br><b>Radius :</b><br>" +
        shape.options.radius +
        '<br><button class="btn btn-danger" onclick="removeShape()">Del</button><br>';
      var popup = L.popup().setContent(content);
      shape.bindPopup(popup);
    });
  });
});
// const removeShape = (e) => {
//   // addedShapes = addedShapes.filter((item) => item != e.target);
//   //carte.remove(addedShapes[1]);
//   //console.log(addedShapes);
// };
const removeShape = (shape) => {
  // carte.remove(shape);
  console.log("this should remove the circle ");
};
