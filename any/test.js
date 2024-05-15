const index = {
    modal(modalId) {
        const modal = $(document.getElementById(modalId));
        modal.modal('show').find('.close, .close-btn').on('click', () => modal.modal('hide'));

        const form = modal.find('form');
        if (form.length) {
            form.removeClass('success');
            form[0].reset();
        }

    },

    scrollToDealer(url, anchor) {
        window.location.href = '/' + url + anchor;

        if ($(anchor).length) {
            window.scrollTo({
                top: $(anchor).offset().top - 90,
                behavior: 'smooth'
            })
        }

    },

    sliderContent: {
        // Default: {
        //     link: '/',
        //     title: `<span>Атмосферные испарители высокого давления собственного производства!</span>`
        // },
        /* GasSuf: {
             link: '/?id=2560',
             title: '<h3>До скорой встречи на выставке GasSuf-2021!</h3><p>19-я Международная выставка газобаллонного, газозаправочного оборудования и техники на газомоторном топливе «GasSuf» состоится с 26 по 28 октября в Крокус Экспо. </p>',
         },*/
        vistavka: {
            link: '/',
            title: ' ',
        },
        // start: {
        //     link: '/?id=3028',
        //     title: 'Готовая к отгрузке компрессорная модульная станция',
        // },
        sosud: {
            link: '/?id=2558',
            title: 'Пробоотборные сосуды (синоним: цилиндры, баллоны) MV&F изготавливаются аргонодуговой сваркой из стандартных деталей по отработанной технологии. За счёт этого они имеют намного более привлекательную стоимость и срок поставки в сравнении с импортными цилиндрами (например sample cylinder производства Swagelok, HOKE, Parker)',
        },
        LGS: {
            link: '/klapanyi-serii-lgs/',
            title: `<span>Многофункциональные предохранительные клапаны Seetru серии LGS</span>
            <br/>Область применения:
            <ul style="list-style-type:none;">
                <li>криогеника,</li>
                <li>жидкость,</li>
                <li>газ,</li>
                <li>пар.</li>
            </ul>`
        },
        MecaInox: {
            link: '/sharovye-krany-serii-b-ps4',
            title: `<span>Открытие склада шаровых кранов и обратных клапанов французской компании Meca-Inox!</span>
            <br/>Самые современные и надежные шаровые краны на рынке.
            <br/>Для применения в криогенике, фармацевтике, энергетике, микроэлектронике, химической и
            пищевой промышленности.`
        },
        nikkiso: {
            link: '/kriogennye-nasosnye-sistemy/',
            title: `<span>Криогенные насосы</span>
                  <br><br>Поршневые и центробежные криогенные насосные агрегаты ACD CRYO для сжиженного
                  природного газа, водорода и продуктов разделения воздуха
                  <p>Made in USA <sup><img width="15" src="assets/templates/novinka/images/banners/usa.png"></sup></p>`
        },
        SGT: {
            link: '/ol-shie-fil-try-sgt',
            title: `<span>Новая продукция - картриджные фильтры <br/>финишной очистки SGT серии Big Trap.</span>
            <br/>Самые большие на рынке! Для применения в хроматографии, масспекторометрии. Очистка
            азота, аргона, гелия, водорода от нежелательных примесей.
            <br/><strong>В наличии на складе компании ООО "МВиФ" в Москве!</strong>`
        },
        WI: {
            link: '/gazovie-balloni/',
            title: `<span>Сообщаем об открытии склада газовых баллонов австрийской компании Worthington в России!</span>
            <br>Приобретайте облегчённые баллоны 50л/200бар россыпью или на паллетах кратно 23 по
            льготной цене. С установленными вентилями или без. Заказывайте моноблоки на 8, 12, 16, 18
            баллонов с уникальными потребительскими характеристиками!`
        }
    },

    slider(control, interval = 1) {

        if (!interval) {
            clearInterval(this.sliderInterval);
            const self = this;
            setTimeout(() => self.setSliderInterval(), 10000);
        }


        const currentSlide = $('#slider .background img.visible');
        let nextSlide;
        if (control.classList.contains('right')) {
            nextSlide = currentSlide.next();
            if (!nextSlide.length)
                nextSlide = $('#slider .background img').first();
        } else if (control.classList.contains('left')) {
            nextSlide = currentSlide.prev();
            if (!nextSlide.length)
                nextSlide = $('#slider .background img').last();
        }
        nextSlide
            .addClass('visible')
            .siblings('img').removeClass('visible');

        const id = nextSlide[0].dataset.id;

        /* Хардкод для выставки */
        if (id == "expo") {
            $('#slider').css('background-color', "rgba(0, 0, 0, 0)");
            $('.slide').css('height', "auto");
            $('#slider-text').hide();
            $('#slider-button').hide();
        } else {
            $('#slider').css('background-color', "rgba(0, 0, 0, 0.65)");
            $('.slide').css('height', "450px");
            $('#slider-text').show();
            $('#slider-button').show();
        }

        const sliderContent = this.sliderContent[id];
        $('#slider-text').html(sliderContent.title);
        let btn = $('.control.detail');
        btn.attr('href', sliderContent.link);
    },

    carousel(control, interval = 0) {

        if (control.dataset.disabled)
            return false;

        if (!interval) {
            clearInterval(this.carouselInterval);
            const self = this;
            setTimeout(() => self.setCarouselInterval(), 6000);
        }

        const container = $('.carousel-inner .images');
        const images = container.find('img');
        const imageWidth = images.width();
        const imagesToSlide = screen.width < 768 ? 2 : 3;
        let position = parseInt(container.css('margin-left'));

        const lastImage = container[0].querySelector('img:last-child');
        const lastImageOffsetLeft = lastImage.offsetLeft;
        const firstImage = container[0].querySelector('img:first-child');
        const firstImageOffsetLeft = firstImage.offsetLeft;
        const parent = container[0].parentElement;
        const parentOffsetLeft = parent.offsetLeft;
        const parentOffsetRight = parent.offsetLeft + parent.offsetWidth;

        if (firstImageOffsetLeft >= parentOffsetLeft - imageWidth && control.classList.contains('left')) {        //если слева нет картинок
            container
                .css({marginLeft: (0 - this.carouselWidth) + 'px'})
                .removeClass('animated')
                .prepend(this.carouselImagesHTML);
            position = parseInt(container.css('margin-left'));
        } else if (lastImageOffsetLeft <= parentOffsetRight + imageWidth && control.classList.contains('right'))        //если справа нет картинок
            container
                .removeClass('animated')
                .append(this.carouselImagesHTML);

        const marginLeft = (control.classList.contains('right') ? position - imageWidth * imagesToSlide : position + imageWidth * imagesToSlide) + 'px';

        container.addClass('animated').css({marginLeft: marginLeft});
        control.setAttribute('data-disabled', 1);
        setTimeout(() => control.removeAttribute('data-disabled'), 800);
    },

    hideMenuMobile() {
        const menu = $('#menu-mobile-container');
        menu.removeClass('visible');
        setTimeout(() => menu.remove(), 1000);
    },

    showSubmenu(item) {
        item.className = 'fa fa-caret-up close-submenu';
        item.setAttribute('onclick', 'index.closeSubmenu(this)');
        const submenu = $(item).closest('li').find('ul.submenu');
        submenu.show();
    },

    closeSubmenu(item) {
        item.className = 'fa fa-caret-down show-submenu';
        item.setAttribute('onclick', 'index.showSubmenu(this)');
        const submenu = $(item).closest('li').find('ul.submenu');
        submenu.hide();
    },

    showMenuMobile() {
        $('body').append('<div id="menu-mobile-container"><span id="close-menu"></span><div class="menu-inner"></div></div>');
        const header = $('header');
        header.find('.header-info.inner').clone().appendTo('#menu-mobile-container .menu-inner');
        $('.extra-search-form').clone().appendTo('#menu-mobile-container .menu-inner');
        header.find('nav .links').clone().appendTo('#menu-mobile-container .menu-inner');
        setTimeout(() => {
            $('#menu-mobile-container')
                .addClass('visible')
                .find('ul.links').children('li').each((i, li) => $(li).children('a').after('&nbsp;<i class=\'fa fa-caret-down show-submenu\' onclick="index.showSubmenu(this)" aria-hidden=\'true\'></i>'));
        }, 15);
        const self = this;
        $('#close-menu').on('click', () => self.hideMenuMobile());
        $('.search-form').on('submit', e => index.search(e));
    },

    swipe(e) {

        if (this.swipeIsBlocked)
            return 0;

        const x = e.originalEvent.touches[0].clientX;

        //свайп на уровне слайдера
        if ($(e.target).closest('#slider').length) {
            //влево или вправо
            if (x < this.touchstart - 100) {
                $('.right.slider-control').click();
                this.swipeIsBlocked = 1;
            } else if (x > this.touchstart + 100) {
                $('.left.slider-control').click();
                this.swipeIsBlocked = 1;
            }
        }
        //свайп на уровне карусели
        else if ($(e.target).closest('#carousel').length) {
            //влево или вправо
            if (x < this.touchstart - 100) {
                $('.right.carousel-control').click();
                this.swipeIsBlocked = 1;
            } else if (x > this.touchstart + 100) {
                $('.left.carousel-control').click();
                this.swipeIsBlocked = 1;
            }
        }
        //свайп меню по умолчанию
        else {
            if (x < this.touchstart - 100) {
                this.hideMenuMobile();
                this.swipeIsBlocked = 1;
            } else if (x > this.touchstart + 100) {
                this.showMenuMobile();
                this.swipeIsBlocked = 1;
            }
        }

        const self = this;
        setTimeout(() => self.swipeIsBlocked = 0, 500);


    },

    carouselWidth: 0,
    carouselImagesHTML: '',
    touchstart: 0,
    swipeIsBlocked: 0,

    init() {

        $('td.help')
            .on('mouseenter', e => {
                let td = e.target;
                td.innerHTML += td.title;
                td.title = "";

                let img = td.querySelector('img');
                if (img.getBoundingClientRect().left + img.offsetWidth >= screen.width) {
                    img.style.left = "initial";
                    img.style.right = '0';
                }

            })
            .on('mouseout', e => {
                let td = e.target;
                let img = td.querySelector('img');
                td.title = "<img alt='#' src='" + img.src + "' />";
                img.remove();
            });

        const productPage = document.querySelector('.mvif-product-page ');
        if (productPage !== null)
            productPage
                .querySelectorAll('img:not(.no-gallery)')
                .forEach(img => {
                    $(img).wrap(`<a data-fancybox="gallery" href=${img.src} class="gallery" />`)
                });

        const self = this;

        $('.slider-control').on('click', e => self.slider(e.target, 0));
        $('.carousel-control').on('click', e => self.carousel(e.target, 0));

        $('#menu-mobile').on('click', () => self.showMenuMobile());

        $('#lift').on('click', function () {
            if (!this.classList.contains('visible'))
                return false;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        $(window)
            .on('scroll', e => {
                const lift = $('#lift');
                return window.pageYOffset > 1000 ? lift.addClass('visible') : lift.removeClass('visible');
            })
            .on('touchstart', e => self.touchstart = e.originalEvent.touches[0].clientX)
            .on('touchmove', e => self.swipe(e));

        //Автослайдинг в хедере
        const Slider = $('#slider');
        if (Slider.length)
            this.setSliderInterval();

        //Автокарусель
        this.setCarouselInterval();

        Slider.hover(
            () => self.clearInterval = 1,
            () => self.clearInterval = 0
        );

        $('#show-modal-send-mail').on('click', () => index.modal('modal-send-mail'))
        $('#send-mail-form').on('submit', e => index.mail(e));
        $('#subscribe-form').on('submit', e => index.subscribe(e));
        $('.search-form').on('submit', e => index.search(e));

    },

    setSliderInterval() {
        const sliderControl = document.querySelector('.slider-control.right');
        const self = this;
        clearInterval(this.sliderInterval);
        this.sliderInterval = setInterval(() => self.slider(sliderControl), 10000);
    },

    setCarouselInterval() {
        const carouselControl = document.querySelector('.carousel-control.right');
        const self = this;
        clearInterval(this.carouselInterval);
        this.carouselInterval = setInterval(() => self.carousel(carouselControl), 6000);
    },


    mail(e) {
        e.preventDefault();
        const form = e.target;
        const data = validate(form);
        if (!data)
            return 0;

        data.method = 'send_mail';

        const callback = resposne => {
            console.log(resposne);
            if (!resposne.result)
                return alert('Ошибка отправки сообщения. Пожалуйста, повторите попытку позднее.');

            form.classList.add('success');
        };

        fetchfunc('/assets/templates/mvif-new/mailer.php', callback, data);
    },

    search(e) {
        e.preventDefault();
        const form = e.target;
        const data = validate(form);
        if (!data)
            return 0;

        data.method = 'search';
        form.submit();
    },

    subscribe(e) {
        e.preventDefault();
        const form = e.target;
        const data = validate(form);
        if (!data)
            return 0;

        data.method = 'subscribe';

        const callback = resposne => {
            console.log(resposne);

            if (resposne.result === 'exist')
                return alert('Ваш email уже содержится в базе подписчиков');

            alert(resposne.result
                ? 'Спасибо! Ваш email добавлен в базу подписчиков'
                : 'Ошибка подписки. Пожалуйста, повторите попытку позднее.');
        };

        fetchfunc('/assets/templates/mvif-new/mailer.php', callback, data);
    }

};


$(document).ready(() => {
    $('.carousel-inner .images img').each((i, img) => index.carouselWidth += img.offsetWidth);
    index.carouselImagesHTML = $('.carousel-inner .images').html();
    index.init();

    setTimeout(() => {
        let anchor = window.location.hash;
        if ($(anchor).length) {
            window.scrollTo({
                top: $(anchor).offset().top - 90,
                behavior: 'smooth'
            })
        }
    }, 200);


    $('#questionnaire-form').on('submit', function (e) {
        e.preventDefault();
        let form = this;

        if(!form.elements.rules.checked)
            return alert('Вы должны согласиться на обработку персональных данных');

        let data = validate(form);
        if (!data)
            return false;

        data.method = 'Save_questionnaire';

        let callback = response => {
            console.log(response);
            return alert(response.result ? 'Форма отправлена' : 'Форма не отправлена')
        };

        fetchfunc('/assets/components/immersion-heaters-questionnaire/php/server.php', callback, data);
    });


    $('#questionnaire-form select').on('change', function () {

        if (this.value === 'other') {

            let modal = $('.modal-set-other-value');
            modal.modal('show').find('.close, .close-btn').on('click', () => modal.modal('hide'));
            modal.find('form').on('submit', e => {
                e.preventDefault();
                let value = e.target.other.value;
                let newOption = this.querySelector('option.new-value');

                if (newOption === null) {
                    newOption = document.createElement('option');
                    newOption.className = 'new-value';
                    this.appendChild(newOption);
                }

                newOption.setAttribute('value', value);
                newOption.innerText = value;
                newOption.selected = true;
                modal.modal('hide');
            });
        }

    });

    // Initial_temperature: ""
    // city: ""
    // company: ""
    // connection_diagram: "0"
    // diameter_bunch: "0"
    // email: "titov_yw@mail.ru"
    // execution: "0"
    // execution_equipment: "0"
    // final_temperature: ""
    // fio: ""
    // heated_medium: ""
    // heating_time: ""
    // immersion_length: "0"
    // message: ""
    // method: "Save_questionnaire"
    // operating_temperature: "0"
    // phone: "+7-909-906-98-88"
    // position: ""
    // power: "0"
    // power_control_cabinet: "0"
    // protection_class: "0"
    // rules: true
    // supply_voltage: "0"
    // temperature_heated_medium: ""
    // temperature_heating_elements: ""
    // thermal_insulation_tank: "0"
    // thread: "0"
    // thread_depth: "0"
    // volume: ""


});