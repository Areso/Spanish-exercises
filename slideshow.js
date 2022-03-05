//DOM OBJECTS
topic_dom  = document.getElementById("textTopic");
img_dom    = document.getElementById("image");
textSp_dom = document.getElementById("textSp");
textEn_dom = document.getElementById("textEn");
textSpEx_dom  = document.getElementById("textSpEx");
textEnEx_dom  = document.getElementById("textEnEx");
textTable_dom = document.getElementById("textTbl");
cells   = [document.getElementById("td_1st")];
cells.push(document.getElementById("td_2nd"));
cells.push(document.getElementById("td_3rd"));
cells.push(document.getElementById("td_we"));
cells.push(document.getElementById("td_you_pl"));
cells.push(document.getElementById("td_ellos_uds"));

//JS INIT
posRe = 0;
topic = 0;
counter = 0;
//ENTRY POINT
function loadSelectedTopic() {
	path_to_load       = "decks/"+"big"+".js"
	console.log(path_to_load);
	include(path_to_load,function(){
		loadLesson();
	});
}
function loadLesson() {
	console.log("start")
	console.log(cards);
	buildDeck();
	topic_dom.innerText = deckName;
	//img_dom
	textSp_dom.innerText     = cards[card_id].sp;
	textEn_dom.innerText     = cards[card_id].en;
	textSpEx_dom.innerText   = cards[card_id].sp_ex;
	textEnEx_dom.innerText   = cards[card_id].en_ex;
	if (cards[card_id].ctable.length !==0) {
		textTable_dom.style.display="block";
		it=0;
		while (it<6){
			cells[it].innerHTML=cards[card_id]["ctable"][it]
			it+=1
		}
	} else {
		textTable_dom.style.display="none";
	}
	cards_deck_learn   = new Array();
	for (i=0;i<cards_deck.length;i++){
		cards_deck_learn.push(cards_deck[i])
	}
	console.log("show me cards_deck_learn");
	console.log(cards_deck_learn); 
}
function buildDeck() {
	smallPractice      = true;
	if (smallPractice) {//FOR DEBUG!
		console.log("build a custom deck to train it");
		if (cards.length>2) {
			number_of_cards_to_train = 2;
		} else {
			number_of_cards_to_train = cards.length;
		}
		console.log("number of custom deck cards");
		console.log(number_of_cards_to_train);
		number_cards_in_deck       = 0;
		cards_deck                 = [];
		card_id_deck_iterator      = 0;
		while (number_cards_in_deck < number_of_cards_to_train) {
			roll_the_dice          = Math.floor(Math.random()*cards.length);
			if (roll_the_dice === 0) {
				//check whether this card is already added or not?
				if (!inArray2(cards_deck,card_id_deck_iterator)){
					cards_deck.push(card_id_deck_iterator);
					number_cards_in_deck  += 1;
				}
			}
			if (card_id_deck_iterator<cards.length-1){
				card_id_deck_iterator += 1;
			} else {
				card_id_deck_iterator  = 0;
			} 
		}
		card_id = cards_deck[0];
	}
	console.log("show me my deck cards_deck");
	console.log(cards_deck);
}
function nextCard() {
	if (cards_deck_learn.length > 1){
		cards_deck_learn.shift();
		card_id = cards_deck_learn[0];
		textSp_dom.innerText   = cards[card_id].sp;
		textEn_dom.innerText   = cards[card_id].en;
		textSpEx_dom.innerText   = cards[card_id].sp_ex;
		textEnEx_dom.innerText   = cards[card_id].en_ex;
		if (cards[card_id].ctable.length !==0) {
			textTable_dom.style.display="block";
			it=0;
			while (it<6){
				cells[it].innerHTML=cards[card_id]["ctable"][it]
				it+=1
			}
		} else {
			textTable_dom.style.display="none";
		}
	} else {
		cards_deck_learn.shift(); //delete the last item, so the array is empty
	}
}
function check() {
	
}
//HELPERS
function inArray2(arrayToCheck, valueToCheck) {
	return arrayToCheck.indexOf(valueToCheck) > -1;
}
function inArray(needle,haystack){
	count=haystack.length;
	for(var i=0;i<count;i++){
		if(haystack[i]===needle){return true;}
	}
	return false;
}
include = function (url, fn) {
	var e = document.createElement("script");
	e.onload = fn;
	e.src = url;
	e.async=true;
	document.getElementsByTagName("head")[0].appendChild(e);
};
loadSelectedTopic()
