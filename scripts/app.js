const contactList = [];

// run after DOM loads
 $(() => {
   // controls contact modal
   const $contactArrow = $('.contact');
   const $contactModal = $('.contact-list');
   const toggleContact = () => {
     const $chevron = $('.contact-chevron').attr('name');
     // if chevron down, change to up. if up, change down
     if ($chevron === 'chevron-down-outline') {
       $('.contact-chevron').attr('name','chevron-up-outline');
       // invert nav bar colors
       $('.desktop').css('background-color','black').css('color','white');
       $('.contact').toggleClass('color-override');
     } else if ($chevron === 'chevron-up-outline') {
       $('.contact-chevron').attr('name','chevron-down-outline');
       //invert nav bar colors
       $('.desktop').css('background-color','white').css('color','black');
       $('.contact').toggleClass('color-override');
     }
     // make the drop down nav appear
     $contactModal.toggleClass('unhide-flex');
   }
   $contactArrow.on('click', toggleContact);

   // contact submit desktop
   $('[name="submit"]').on('click', () => {
     const contactInfo = {
       name: '',
       email: ''
     }
     // put inputs into object
     contactInfo.name = $('[name="enter-name"]').val();
     contactInfo.email = $('[name="enter-email"]').val();
     // push object into array
     contactList.push(contactInfo);
     // notify user of submission
     $('.user-contact').empty();
     $('<p>').text(`Thanks ${contactInfo.name}! I'll be in touch soon!`).appendTo('.user-contact');
   })

   // contact submit mobile
   $('[name="submit-mobile"]').on('click', () => {
     const contactInfo = {
       name: '',
       email: ''
     }
     // put inputs into object
     contactInfo.name = $('[name="enter-name-mobile"]').val();
     contactInfo.email = $('[name="enter-email-mobile"]').val();
     // push object into array
     contactList.push(contactInfo);
     // notify user of submission
     $('.user-contact').empty();
     $('<p>').text(`Thanks ${contactInfo.name}! I'll be in touch soon!`).appendTo('.user-contact');
   })

   // controls nav dropdown modal
   const $dropArrow = $('.mobile')
   const $mobileNav = $('.mobile-drpdwn')
   const toggleModal = () => {
     const $chevron = $('.chevron').attr('name');
     // if chevron down, change to up. if up, change down
     if ($chevron === 'chevron-down-outline') {
       $('.chevron').attr('name','chevron-up-outline');
       // invert nav bar colors
       $('.mobile').css('background-color','black').css('color','white')
     } else if ($chevron === 'chevron-up-outline') {
       $('.chevron').attr('name','chevron-down-outline');
       //invert nav bar colors
       $('.mobile').css('background-color','white').css('color','black')
     }
     // make the drop down nav appear
     $mobileNav.toggleClass('unhide');
   }
   $dropArrow.on('click', toggleModal);

   // carousel
   currentProjectIndex = 0;
   // count number of projects then set index number
   numOfProjects = $('section.carousel').children('article').length - 1;
   // on forward click
   $('.carousel-next').on('click', () => {
     // change current project to not display
     $('section.carousel').children('article').eq(currentProjectIndex).css('display', 'none');
     // progress the index count or reset if at end
     if(currentProjectIndex < numOfProjects) {
       currentProjectIndex++;
     } else {
       currentProjectIndex = 0;
     }
     // display new project
     $('section.carousel').children('article').eq(currentProjectIndex).css('display','flex');
   })
   // on previous click (the rest is the same but opposite direction)
   $('.carousel-previous').on('click', () => {
     $('section.carousel').children('article').eq(currentProjectIndex).css('display', 'none');
     if(currentProjectIndex > 0) {
       currentProjectIndex--;
     } else {
       currentProjectIndex = numOfProjects;
     }
     $('section.carousel').children('article').eq(currentProjectIndex).css('display','flex');
   })


 })
