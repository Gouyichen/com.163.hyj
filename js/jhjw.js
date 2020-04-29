$(document).scroll(function(){
    if( $(document).scrollTop() >= 500){ 
     console.log(111)
     $('#tops').show()
    }
    else if ( $(document).scrollTop() <= 500){
     $('#tops').hide()
    }
       })
