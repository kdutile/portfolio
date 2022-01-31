
 $(() => {

   // controls nav dropdown modal
   const $dropArrow = $('.mobile')
   const $mobileNav = $('.mobile-drpdwn')
   const openModal = () => {
     const $chevron = $('.chevron').attr('name');
     if ($chevron === 'chevron-down-outline') {
       $('.chevron').attr('name','chevron-up-outline');
     } else if ($chevron === 'chevron-up-outline') {
       $('.chevron').attr('name','chevron-down-outline');
     }
     $mobileNav.toggleClass('unhide');
     $('section.main').toggleClass('hide');
   }
   $dropArrow.on('click', openModal);

   // carousel
   currentProjectIndex = 0;
   numOfProjects = $('section.carousel').children('article').length - 1;
   $('.carousel-next').on('click', () => {
     $('section.carousel').children('article').eq(currentProjectIndex).css('display', 'none');
     if(currentProjectIndex < numOfProjects) {
       currentProjectIndex++;
     } else {
       currentProjectIndex = 0;
     }
     $('section.carousel').children('article').eq(currentProjectIndex).css('display','flex');
   })

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
