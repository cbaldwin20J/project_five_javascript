document.addEventListener('DOMContentLoaded', () => {
	
	// this is the html that goes inside the 'ul'
	// after api retrieves profiles
	let html;

	// when a user uses the search input then this
	// will delete all the html and repopulate
	// the 'ul' with new html
	function start_html(){
		html = '';
		html +=	`<h2>AWESOME STARTUP EMPLOYEE DIRECTORY</h2>
				<p>
					<input type="text" id="search_input" placeholder="Start typing...">
					<input type="submit" id="search_button" value="Search">
				</p>`;
	}


	// once the 'html' variable is filled then
	// put it into the 'ul'.
	function addHTML(){
		const ul = document.querySelector('ul');
		ul.innerHTML = html;

		// once the html is added to the page then add an 
		// event listener to the search input
		const search_button = document.getElementById('search_button');
		search_button.addEventListener('click', function(event){
			const search_input = document.getElementById('search_input').value.trim();
			let name;
			// get all the 'li' and display only the ones that match
			// the search input value
			const lis = $('.unclicked_li');
			for (let i=0; i<lis.length; i++){
				name = lis[i].children[1].children[0].children[0].innerText;
				if (search_input == ''){
					lis[i].style.display = '';
				}else if(name.search(search_input) > -1){
					lis.eq(i).show();
				}else{
					lis.eq(i).hide();
				}
			}
			
			// for the search field, if they hit 'enter' instead
			// of clicking the button then do this.
			const input = document.getElementById('search_input');
			input.addEventListener("keyup", function(event) {
			  // Cancel the default action, if needed
			  event.preventDefault();
			  // Number 13 is the "Enter" key on the keyboard
			  if (event.keyCode === 13) {
			    // Trigger the button element with a click
			    document.getElementById('search_button').click();
			  }
			});
		});
	} // end of 'add_html() function'


		function generateProfiles(resultsArray){
			// we get a json list of profiles, and here we 
			// loop through each one the create the html
			// to be put in the 'ul'
			for (let i=0; i<resultsArray.length; i++){
				// this is the profile info to be put into html
				let large_picture = resultsArray[i].picture.large;
				let first_name = resultsArray[i].name.first;
				let last_name = resultsArray[i].name.last;
				let email = resultsArray[i].email;
				let city = resultsArray[i].location.city;
				
				let phone = resultsArray[i].phone;
				let street = resultsArray[i].location.street;
				let state = resultsArray[i].location.state;
				
				let postcode = resultsArray[i].location.postcode;
				let wholeAddress = street + ", " + state + " " + postcode;
				
				let birthday_raw = resultsArray[i].dob.date;
				let date = new Date(birthday_raw);
				let birthday_refined = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getYear();
				
				// this html is one profile for each loop
				html += `<li class='clearfix unclicked_li'>
							<a class="unlicked_a" href="${large_picture}" rel="lightbox">
				 			<img class="unclicked_img" src="${large_picture}" width="120" height="120">
				 			</a>
				 			<div class="unclicked_text">
				 				<div class="shownInfo">
				 					<h2><strong>${first_name} ${last_name}</strong></h2>
				 					<p>${email}</p>
				 					<p>${city}</p>
				 				</div>

				 				<div class="hiddenInfo">
				 					<hr/>
				 					<p>${phone}</p>
				 					<p>${wholeAddress}</p>
				 					<p>Birthday: ${birthday_refined}</p>
				 				</div>
				 			</div>
				 		</li>`;
						};
				//once the loop ends and goes through all
				// the profile then add the html to the 'ul'
				addHTML();

				// this code came with the lightbox plugin
				$(function(){
				  $('a[rel=lightbox]').lightBox({
				    containerResizeSpeed: 250,
				    fixedNavigation: true
				  });
				  $('a[rel=2ndlightbox]').lightBox({
				    overlayBgColor: '#fff',
				    overlayOpacity: 0.7
				  });
				});
		}; // end of function 'generate_profiles()'

		// get 12 USA profiles from the api randomuser.me
		// and send it to 'generateProfiles()'
		fetch('https://randomuser.me/api/?results=12&nat=us')
		.then(response => response.json())
		.then(data => generateProfiles(data.results));

	// runs only when page loads to kickstart the html
	// to be put in the 'ul'
	start_html();
		
});


