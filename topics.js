topics = [];
topics.push(["Regular verbs", "regular_verbs"]);
function load() {
	topicSelector = document.getElementById("topicSelector");
	for(var j in topics)	{
		topicSelector.add(new Option(topics[j][0],topics[j][1]));
	}
}
window.onload = load;   
