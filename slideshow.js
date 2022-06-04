//DOM OBJECTS
topic_dom  = document.getElementById("textTopic");
img_dom    = document.getElementById("image");
rl_img_dom = document.getElementById("realImg");
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
started = true;
posRe   = 0;
topic   = 0;
counter = 0;
looped  = true;
shown_ar= []
//LOADING DECK
function loadSelectedTopic() {
	path_to_load       = "decks/"+"big"+".js"
	include(path_to_load,function(){
		loadLesson();
	});
}
function loadLesson() {
	shown_ar = [];
	buildDeck();
	//topic_dom.innerText = deckName;
	//img_dom
	textSp_dom.innerText     = cards[card_id].sp;
	textEn_dom.innerText     = cards[card_id].en;
	ex_numbers  = cards[card_id].sp_ex.length;
	ex_no       = random(0,ex_numbers-1);
	console.log("ex no is ", ex_no);
	textSpEx_dom.innerText   = cards[card_id].sp_ex[ex_no];
	textEnEx_dom.innerText   = cards[card_id].en_ex[ex_no];
	if (cards[card_id].ctable.length !==0) {
		textTable_dom.style.display="block";
		it=0;
		rnd = 0; //present time
		the_block = cards[card_id]["ctable"][rnd]
		while (it<6){
			reddish = the_block[it].replace("<r>","<span class='red'>");
			reddish = reddish.replace("</r>","</span>");
			cells[it].innerHTML=reddish;
			it+=1
		}
	} else {
		textTable_dom.style.display="none";
	}
	if (cards[card_id].image!==""){
		rl_img_dom.src=cards[card_id].img;
	} else {
		rl_img_dom.src="decks/mock.png";
	}
	cards_deck_to_learn   = new Array();
	for (i=0;i<cards_deck.length;i++){
		cards_deck_to_learn.push(cards_deck[i])
	}
}
function buildDeck() {
	smallPractice      = false;
	if (smallPractice) {//FOR DEBUG!
		if (cards.length>3) {
			number_of_cards_to_train = 3;
		} else {
			number_of_cards_to_train = cards.length;
		}
	} else {
		number_of_cards_to_train = cards.length;
	}
	//console.log("number of custom deck cards");
	//console.log(number_of_cards_to_train);
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
function nextCard(prev=false) {
	if (cards_deck_to_learn.length > 1){
		if (prev===false){
			shown_card = cards_deck_to_learn.shift();
			shown_ar.push(shown_card)
		} 
		card_id = cards_deck_to_learn[0];
		textSp_dom.innerText   = cards[card_id].sp;
		textEn_dom.innerText   = cards[card_id].en;
		ex_numbers  = cards[card_id].sp_ex.length;
		ex_no       = random(0,ex_numbers-1);
		console.log("ex no is ", ex_no);
		textSpEx_dom.innerText   = cards[card_id].sp_ex[ex_no];
		textEnEx_dom.innerText   = cards[card_id].en_ex[ex_no];
		if (cards[card_id].ctable.length !==0) {
			textTable_dom.style.display="block";
			it=0;
			rnd = 0; //present time
			the_block = cards[card_id]["ctable"][rnd]
			while (it<6){
				try{
					reddish = the_block[it].replace("<r>","<span class='red'>");
					reddish = reddish.replace("</r>","</span>");
					cells[it].innerHTML=reddish;
				} catch (error) {
					console.log(cards[card_id]);
					console.log(cards[card_id].ctable);
				}
				it+=1
			}
		} else {
			textTable_dom.style.display="none";
		}
		if (cards[card_id].image!==""){
			rl_img_dom.src=cards[card_id].img;
		} else {
			rl_img_dom.src="decks/blank.png";
		}
	} else {
		cards_deck_to_learn.shift(); //delete the last item, so the array is empty
		if (looped){
			loadLesson();
		}
	}
}
function prevCard() {
	let insertAtIndex = 0
	let itemsToRemove = 0
	lastShown = shown_ar[shown_ar.length-1]
	cards_deck_to_learn.splice(insertAtIndex, itemsToRemove, lastShown)
	shown_ar.pop()
	nextCard(true);
}
function check() {
	
}
function stopStart(){
	if (started) {
		started = false;
		clearInterval(mytimer);
		document.getElementById("btnStartStop").innerHTML="Continue";
	} else {
		started = true;
		nextCard();
		mytimer = setInterval(nextCard, 20000);
		document.getElementById("btnStartStop").innerHTML="Stop";
	}
}
//HELPERS
function random(min,max) {
	return Math.floor((Math.random())*(max-min+1))+min;
}
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
//ENTRY POINT
loadSelectedTopic()
mytimer = setInterval(nextCard, 20000);
