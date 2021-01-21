var queries = [{
	"competencyQuestion": "Retrieve words associated with each synset",
	"query": "PREFIX wn30schema: <https://w3id.org/framester/wn/wn30/schema/> \n \nSELECT DISTINCT ?syn ?lexical WHERE { \n  ?syn wn30schema:containsWordSense ?wordSense . \n  ?wordSense wn30schema:word ?word . \n  ?word wn30schema:lexicalForm ?lexical . \n} LIMIT 10",
	"url":"http://etna.istc.cnr.it/framester2/sparql?default-graph-uri=&query=PREFIX+wn30schema%3A+%3Chttps%3A%2F%2Fw3id.org%2Fframester%2Fwn%2Fwn30%2Fschema%2F%3E+%0D%0A+%0D%0ASELECT+DISTINCT+%3Fsyn+%3Flexical+WHERE+%7B+%0D%0A++%3Fsyn+wn30schema%3AcontainsWordSense+%3FwordSense+.+%0D%0A++%3FwordSense+wn30schema%3Aword+%3Fword+.+%0D%0A++%3Fword+wn30schema%3AlexicalForm+%3Flexical+.+%0D%0A%7D+LIMIT+10&format=text%2Fhtml&timeout=0&debug=on"
},
{
		"competencyQuestion": "Retrieve sentiment scores associated with each synset",
		"query": "PREFIX wn30instances: <https://w3id.org/framester/wn/wn30/instances/>\nPREFIX wn30schema: <https://w3id.org/framester/wn/wn30/schema/>\nPREFIX depmood: <https://w3id.org/framester/depechemood/depechemood2wn/>\nSELECT * WHERE {\n\t?syn depmood:AFRAIDscore ?afraid ;\n\tdepmood:AMUSEDscore ?amused ;\n\tdepmood:ANGRYscore ?angry ;\n\tdepmood:ANNOYEDscore ?annoyed ;\n\tdepmood:DONT_CAREscore ?dontCare ;\n\tdepmood:HAPPYscore ?happyScore ;\n\tdepmood:INSPIREDscore ?inspired ;\n\tdepmood:SADscore ?sad\n}\nLIMIT 10",
		"url":"http://etna.istc.cnr.it/framester2/sparql?default-graph-uri=&query=PREFIX+wn30instances%3A+%3Chttps%3A%2F%2Fw3id.org%2Fframester%2Fwn%2Fwn30%2Finstances%2F%3E%0D%0APREFIX+wn30schema%3A+%3Chttps%3A%2F%2Fw3id.org%2Fframester%2Fwn%2Fwn30%2Fschema%2F%3E%0D%0APREFIX+depmood%3A+%3Chttps%3A%2F%2Fw3id.org%2Fframester%2Fdepechemood%2Fdepechemood2wn%2F%3E%0D%0ASELECT+*+WHERE+%7B%0D%0A%09%3Fsyn+depmood%3AAFRAIDscore+%3Fafraid+%3B%0D%0A%09depmood%3AAMUSEDscore+%3Famused+%3B%0D%0A%09depmood%3AANGRYscore+%3Fangry+%3B%0D%0A%09depmood%3AANNOYEDscore+%3Fannoyed+%3B%0D%0A%09depmood%3ADONT_CAREscore+%3FdontCare+%3B%0D%0A%09depmood%3AHAPPYscore+%3FhappyScore+%3B%0D%0A%09depmood%3AINSPIREDscore+%3Finspired+%3B%0D%0A%09depmood%3ASADscore+%3Fsad%0D%0A%7D%0D%0ALIMIT+10&format=text%2Fhtml&timeout=0&debug=on"
	},
	{
		"competencyQuestion":"Retrieve polarity score associated with each synset",
		"query":"PREFIX swn: <https://w3id.org/framester/sentiwordnet/>\n\nSELECT DISTINCT * WHERE {\n  ?syn swn:negScore ?negScore .\n  ?syn swn:posScore ?posScore .\n} LIMIT 10",
		"url": "http://etna.istc.cnr.it/framester2/sparql?default-graph-uri=&query=PREFIX+swn%3A+%3Chttps%3A%2F%2Fw3id.org%2Fframester%2Fsentiwordnet%2F%3E%0D%0A%0D%0ASELECT+DISTINCT+*+WHERE+%7B%0D%0A++%3Fsyn+swn%3AnegScore+%3FnegScore+.%0D%0A++%3Fsyn+swn%3AposScore+%3FposScore+.%0D%0A%7D+LIMIT+10&format=text%2Fhtml&timeout=0&debug=on"
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
