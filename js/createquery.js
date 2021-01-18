var queries = [{
    "competencyQuestion": "ABC",
    "query": "ANC",
    "url": "ABC"
  },
  {
    "competencyQuestion": "ABC",
    "query": "ANC",
    "url": "ABC"
  },
  {
    "competencyQuestion": "ABC",
    "query": "ANC",
    "url": "ABC"
  },
  {
    "competencyQuestion": "ABC",
    "query": "ANC",
    "url": "ABC"
  }
]


window.addEventListener("load", function() {
  var querygrid = "<div class=\"row\">";

  for (i = 0; i < queries.length; i++) {
    if (i>0 && i % 3 == 0) {
      querygrid += "</div><div class=\"row\">";
    }
    querygrid += getQueryCell(queries[i]["competencyQuestion"], queries[i]["query"], queries[i]["url"]);
  }

  querygrid += "</div>"

	$("#query-container").html(querygrid);
});

function getQueryCell(competencyQuestion, query, url) {

  var queryCellTemplate = `
	<div class="col-lg-4">

		<!-- competency questions -->
		<div class="row">
			<div class="col-lg-12">
				<p class="lead">${competencyQuestion}</p>
			</div>
		</div>

		<!-- Sparql query -->
		<div class="row">
			<div class="col-lg-12">
				<div class="mt-12">
					<pre class="prettyprint lang-sparql sparql-example">${query}</pre>
				</div>
			</div>
		</div>

		<!-- fire-->
		<div class="row">
			<div class="col-lg-12">
				<div class="mt-12">
					<div class="text-center mt-4">
						<a class="btn btn-xl btn-outline-light" href="${url}"
							target="_blank">
							<i class="fa fa-search mr-2"></i>
							Run!
						</a>
					</div>
				</div>
			</div>

		</div>
	</div>`;
	return queryCellTemplate;
}
