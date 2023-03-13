var app = {

    init: () => {

        /**
        * *****************************
        * L I S T E N E R S
        * *****************************
        */
        /**
         * Materialize init
         */
        $('.sidenav').sidenav();
        $('.dropdown-trigger').dropdown();
        $('select').formSelect();
        $('.modal').modal();
        $('.collapsible').collapsible();
        $('.parallax').parallax();
        $('.carousel').carousel({
            indicators: true
        });

        // Fade out flash messages
        setTimeout(() => {
            $('.alert').fadeOut('fast')
        }, 3000);

        // If Spinner anim, disabled it onload
        app.closeLoadingAnim();
    },


    /**
    * *****************************
    * F U N C T I O N S
    * *****************************
    */
    refresh: () => {
        location.reload();
    },

    loadingAnim: () => {
        $('.animation-loading-container').fadeIn().css('display', 'block');
    },

    closeLoadingAnim: () => {
        setTimeout(() => {
            $('.animation-loading-container').fadeIn().css('display', 'none');
        }, 1000);
    },
}

document.addEventListener('DOMContentLoaded', app.init)
