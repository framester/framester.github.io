var  yasgui;
window.addEventListener("load", function() {

  yasgui = new Yasgui(document.getElementById("yasgui"), {
    requestConfig: {
      endpoint: 'http://etna.istc.cnr.it/framester2/sparql'
    },
    copyEndpointOnNewTab: false
  });

  $.getJSON("js/queries.json", function(data) {
    populateDrowdown("datasets", data, "dataset");
    addClick("dataset", data);
  });
});


function populateDrowdown(id, data, klass) {
  var ddm = "";
  Object.keys(data).forEach(function(key) {
    ddm += `<a id="${key}" class="dropdown-item ${klass}">${key}</a>`
  });
  $("#" + id).append(ddm);
}

function addClick(klass, data) {
  $("." + klass).on("click", function() {
    if ($(this).hasClass("dataset")) {
      $(".sec-button").remove();
    }
    var id = $(this).attr("id");
    if (Array.isArray(data[id])) {
      // is object, then create button with queries

      var subDataset = `<div class="btn-group query-button sec-button" role="group" id="buttonQuery${id}">
				<button id="dropdownMenuButtonQuery${id}" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Queries</button>
				<div class="dropdown-menu" id="${id}-items-queries" aria-labelledby="btnGroupDrop1"></div>
			</div>`;

      $("#buttons").append(subDataset);
      var ddm = "";
      for (i = 0; i < data[id].length; i++) {
        ddm += `<a id="${id}-${i}" queryId="${i}" class="dropdown-item query">${data[id][i].competencyQuestion}</a>`
      }
      $(`#${id}-items-queries`).append(ddm);
      for (i = 0; i < data[id].length; i++) {
        idQuery = `#${id}-${i}`;
        $(idQuery).on("click", function() {

					var tab = yasgui.addTab(
					true,
					{  name: data[id][parseInt($(this).attr("queryId"))].competencyQuestion  }
					);

					tab.setQuery(data[id][parseInt($(this).attr("queryId"))].query);
        });
      }
    } else {
      var subDataset = `<div class="btn-group sec-button query-button" role="group" id="button${id}">
					<button id="dropdownMenuButton${id}" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${id}</button>
					<div class="dropdown-menu" id="${id}-items" aria-labelledby="btnGroupDrop1"></div>
				</div>`;

      $("#buttons").append(subDataset);
      populateDrowdown(`${id}-items`, data[$(this).attr("id")], `${id}-item`);
      addClick(`${id}-item`, data[$(this).attr("id")]);
    }

  });
}
