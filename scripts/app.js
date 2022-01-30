
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
   }
   $dropArrow.on('click', openModal);

 })
