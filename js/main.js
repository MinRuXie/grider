$(function(){
    let $takeshot_btn = $('#js-takeshot-btn');
    let $colsed_modal_btn = $('#js-colsed-btn');

    let $year_wrap = $('#js-year-wrap');
    let $grid_wrap = $('#js-grid-wrap');
    let $output_warp = $('.output-wrap');

    let $year_font_size = $('#js-year-font-size');
    let $year_color = $('#js-year-color');
    let $year_weight = $('#js-year-font-weight');
    let $year_font_family_link = $('#js-year-font-family-link');
    let $year_font_family_name = $('#js-year-font-family-name');

    let today = new Date();
    let current_year = today.getFullYear();

    let count_x = 4;
    let count_y = 4;

    function createImagesWrap() {
        for(let i=0 ; i < count_x * count_y ; i++) {
            $grid_wrap.append(
                `<div class="image-wrap">
                    <input type="file" class="edit-btn">
                    <img src="#" alt="your image" />
                </div>`
            );
        }

        $grid_wrap.css({
            'grid-template-columns': `repeat(${count_x}, 1fr)`,
            'grid-template-rows': `repeat(${count_y}, 1fr)`
        });

        // $content_wrap.css({
        //     'grid-template-columns': `repeat(${count_x}, 1fr)`,
        //     'grid-template-rows': `repeat(${count_y}, 1fr)`
        // });
    }

    function bindImageEvent() {
        $('.edit-btn').each(function(index){
            let $img_wrap = $(this).siblings('img');

            $(this).on('change', function(event){
                /* refrence: http://jsfiddle.net/LvsYc/ */
                if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    
                    reader.onload = function(e) {
                        $img_wrap.attr('src', e.target.result);
                    }
                    
                    reader.readAsDataURL(this.files[0]); // convert to base64 string
                }
            });
        });
    }

    async function buildView() {
        await createImagesWrap();
        await bindImageEvent();
    }

    function initFormDefaultValue() {
        /* font size */
        $year_wrap.text(current_year);
        $year_font_size.val(parseInt($year_wrap.css('font-size')));

        /* font color */
        let year_rgb = getRGB($year_wrap.css('color'));
        let year_hex = rgbToHex(year_rgb.red, year_rgb.green, year_rgb.blue);
        $year_color.val(year_hex);

        /* font weight */
        $year_weight.val($year_wrap.css('font-weight'));

        /* font family */
        let font_url = document.querySelector('link[href*="fonts.googleapis"]').href;
        $year_font_family_link.val(font_url);
        $year_font_family_name.val($year_wrap.css('font-family'));
    }

    function getScreenshot() {
        $(document).scrollTop(0);
        
        let $output = $('#output');
        $output.empty();

        html2canvas(document.querySelector("#capture")
        ).then(canvas => {
            $output.append(canvas);
            $screenshot_wrap.removeClass('capturing');
        });
    }

    function changeYearSize() {
        $year_wrap.css({
            'font-size': $year_font_size.val() + 'px'
        });
    }

    function changeYearColor() {
        $year_wrap.css({
            'color': $year_color.val()
        });
    }

    function changeYearWeight() {
        $year_wrap.css({
            'font-weight': $year_weight.val()
        });
    }

    function changeFontLink() {
        document.querySelector('link[href*="fonts.googleapis"]').href = $year_font_family_link.val();
    }

    function changeYearFont() {
        $year_wrap.css({
            'font-family': $year_font_family_name.val()
        });
    }
    

    $takeshot_btn.on('click', function(){
        getScreenshot();
        $output_warp.addClass('show');
    });

    $colsed_modal_btn.on('click', function(){
        $output_warp.removeClass('show');
    });

    $year_font_size.on('change', function(){
        changeYearSize();      
    }).on('keydown', function(){
        changeYearSize();      
    });

    $year_color.on('change', function(){
        changeYearColor();
    });

    $year_weight.on('change', function(){
        changeYearWeight();
    });

    $year_font_family_link.on('change', function(){
        changeFontLink();
    });

    $year_font_family_name.on('change', function(){
        changeYearFont();
    });


    /* init */
    buildView(); // promise
    initFormDefaultValue();

    //---------------------------------------------
    // 將 rgb(red, green ,blue) 字串 轉換為 JSON物件
    // 來源: https://stackoverflow.com/questions/34980574/how-to-extract-color-values-from-rgb-string-in-javascript
    //---------------------------------------------
    function getRGB(str) {
        var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
        return match ? {
          red: parseInt(match[1]),
          green: parseInt(match[2]),
          blue: parseInt(match[3])
        } : {};
      }

    //-----------------------
    // 將 0~255 轉換為 16進位
    // 來源: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    //-----------------------
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    //-----------------------
    // 將 rgb 轉換為 hex
    // 來源: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    //-----------------------
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
});