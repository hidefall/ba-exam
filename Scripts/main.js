;(function($){
  'use strict';

    $('a[href*="#"]').on('click', function (){

      event.preventDefault();

      $('body').animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 600);
    });

    $(window).on('load', function(){
      $('.ba-slider').slick({
        dots: true,
        arrows: true,
        slide: '.ba-slide',
        prevArrow: '.ba-prev',
        nextArrow: '.ba-next'
      });
        $('.slick-dots button').each(function(){
        $(this).text( '0' + $(this).text() );
      });
    });

   function createMap () {
    var $markers =$('.ba-marker');
    console.log($markers);

    var map = new google.maps.Map($('.ba-map')[0],{
      zoom: 14,
      scrollwheel: false,
      center: new google.maps.LatLng(0,0),
      styles:[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}],
    });

    addMarkers($markers, map);
    centerMap($markers, map);
  }

  function addMarkers ($markers, map) {
    $markers.each(function() {
      var lat = $(this).data('lat');
      var lng = $(this).data('lng');
      var icon = $(this).data('icon')
      var marker = new google.maps.Marker({
          position: {lat: lat, lng:lng},
          map: map,
          icon:icon,
      })
      var content = $(this).find('.description').html()


      var infoWindow = new google.maps.InfoWindow({
        content:content,
      })
      marker.addListener('click', function  () {
        infoWindow.open(map,marker);
      });
    });
  }

  function centerMap($markers, map) {

    if ($markers.length == 1) {

      var lat = $markers.data('lat');
      var lng = $markers.data('lng');
      var latLng = new google.maps.LatLng( lat, lng );
      map.setCenter(latLng);
      
    } else { 
      
      var bounds = new google.maps.LatLngBounds();

      $markers.each( function() {
        var lat = $(this).data('lat');
        var lng = $(this).data('lng');
        var latLng = new google.maps.LatLng( lat, lng );
        bounds.extend(latLng);
      });

      map.fitBounds(bounds);

    }

  }
  
createMap()






})(jQuery);
  

