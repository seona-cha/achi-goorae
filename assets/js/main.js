// 드래그 방지
document.onselectstart = function(){
    return false;
}

// -- Layout Setting --//
const layoutChangeHandler = () => {
    const gridInner = document.querySelector('.grid-inner');
    const titleBox = document.createElement('div');
    const title = document.createElement('h1');

    titleBox.classList.add('title-box');
    titleBox.append(title);
    title.classList.add('title');
    title.append('Achi & Goorae');

    function createLayout(sBoxNum, lBoxNum, lLoca, tLoca, empty){
        gridInner.innerHTML = '';

        for(let i=0; i<sBoxNum; i++){
            const smallBox = document.createElement('div');
            smallBox.classList.add('image-box', 'small-box');
            smallBox.classList.add(`s${i+1}`);
            gridInner.append(smallBox);

            if(empty){
                if( i == 1 || i == 7 || i == 15 ){
                    smallBox.classList.remove('image-box');
                    smallBox.classList.add('empty-box');
                };
            }
        };

        for(let i=0; i<lBoxNum; i++){
            const Location = document.querySelector(lLoca);
            const largeBox = document.createElement('div');
            largeBox.classList.add('image-box', 'large-box');
            largeBox.classList.add(`l${i+1}`);

            Location.before(largeBox);
        }
        document.querySelector(tLoca).after(titleBox);
    }


    // mobile
    if(innerWidth <= 720){
        createLayout(12,1,'.s6','.s3');
        layoutMotionMobile();
    };
    // pc
    if(innerWidth > 720){
        createLayout(20,3,'.s6','.l2',true);
        layoutMotionPC();
    };

    const imageBox = document.querySelectorAll('.image-box');
    imageBox.forEach((element) => {
        const img = document.createElement('img');
        element.append(img);
    });

    // 랜덤 이미지 호출
    fetch('./assets/data/images.json')
    .then(res => res.json())
    .then(json => {
        data = json.items;
        
        const image = document.querySelectorAll('.image-box img');
        image.forEach((element)=>{
            let randomNumber = Math.floor(Math.random() * data.length);
            element.setAttribute('src',`${data[randomNumber].imgUrl}`)
            element.setAttribute('alt',`${data[randomNumber].alt}`)
            data.splice(randomNumber,1)                             
        })

        // glitch 효과를 위한 레이어 생성
        const glitchEl = document.querySelectorAll('.image-box');
        glitchEl.forEach((element)=>{
            const layers = document.createElement('div');
            layers.classList.add('glitch__layers');
            element.append(layers);
    
            for(let i=0; i<6; i++){
                const layer = document.createElement('div');
                layer.classList.add('glitch__layer');
                layers.append(layer);
            }
            
            const imgUrl = element.querySelector('img').getAttribute('src');
            const EffectLayer = element.querySelectorAll('.glitch__layer')
            EffectLayer.forEach((layer)=>{
                layer.style.backgroundImage = `url(${imgUrl})`
            })
        })

        // popup layer
        const popupWrapper = document.querySelector('.popup-wrapper');
        const popupInner = document.querySelector('.popup-inner');
        const imageBox = document.querySelectorAll('.image-box img');

        const img = document.createElement('img');
        imageBox.forEach(element => {
            element.addEventListener("click",function(){
                img.setAttribute('src',element.getAttribute('src'))

                popupWrapper.classList.add('on');
                popupInner.append(img);
                setTimeout(function(){
                    popupWrapper.addEventListener("click",dimmedClicked)
                },500)
            })
        })

            // 닫기
            function popupClose(){
                popupWrapper.style.animationName = "fadeOut";
                popupInner.style.animationName = "flipOut";

                setTimeout(function(){
                    popupWrapper.classList.remove('on');
                    img.remove();
                    popupWrapper.style.animationName = "fadeIn";
                    popupInner.style.animationName = "flipIn";
                },300)
            }
            function dimmedClicked(e){
                if(e.target != document.querySelector('.popup-inner img')){
                    popupClose();
                    popupWrapper.removeEventListener("click",dimmedClicked)
                }
            }
            document.querySelector('.close-btn').addEventListener("click",popupClose)

    });

    
};
// -- Layout Setting --//

const mediaQueryList = window.matchMedia(`(max-width: 720px)`);
mediaQueryList.addEventListener('change', layoutChangeHandler);

window.addEventListener('load',function(){
    layoutChangeHandler();
});

// ---- Motions ---- //
function getOffset(element, vw, max, direction){
    let gap = window.innerWidth * vw * direction;

    if(element.classList.contains('small-box')){
        if(gap > max || gap < -max)  gap = max * direction;
        offset = `calc(${100*direction}% + ${gap * 2}px)`;

    } else if (element.classList.contains('large-box')){
        if(gap > max || gap < -max)  gap = max * direction;
        offset = `calc(${direction*50}% + ${gap}px)`;
    }
    return offset;
}

function motionX(element, opacity, duration, delay, direction){
    const box = document.querySelector(element);

    let offset = 0;
    offset = getOffset(box, 0.007, 12, direction);
    
    box.style.transform = `translateX(${offset})`;
    box.style.opacity = opacity;

    box.animate([
        {transform:`translateX(${offset})`, opacity:opacity, easing:"ease"},
        {transform:'translateX(0)', opacity:1}
    ],{
        duration:duration, 
        delay:delay,
        fill:"forwards"
    });
}

function motionY(element, opacity, duration, delay, direction){
    const box = document.querySelector(element);

    let offset = 0;
    offset = getOffset(box, 0.0073, 13.5, direction);

    box.style.transform = `translateY(${offset})`;
    box.style.opacity = opacity;

    box.animate([
        {transform:`translateY(${offset})`, opacity:opacity, easing:"ease"},
        {transform:'translateY(0)', opacity:1}
    ],{
        duration:duration, 
        delay:delay,
        fill:"forwards"
    });
}
// ---- Motions ---- //


// -- PC Motion Setting -- //
function layoutMotionPC() {
    // (element, opacity, duration, delay, direction)
    motionY('.l2',1,500,500,-1);
    motionX('.s1',0,600,700,-1);
    motionX('.l3',1,300,300,1);
    motionY('.s3',0,500,700,1);
    motionX('.s4',1,400,400,-1);
    motionY('.s5',0,600,300,-1);
    motionY('.s6',1,400,1400,-1);
    motionY('.s7',1,600,900,1);
    motionY('.s10',1,400,200,-1);
    motionY('.s11',1,400,400,1);
    motionX('.s12',1,400,1000,1);
    motionX('.s13',0,600,1700,1);
    motionY('.s14',0,500,1200,1);
    motionX('.s18',1,400,800,-1);
    motionY('.s17',0,400,1100,1);
    motionX('.s20',0,500,1200,1);
}
// -- PC Motion Setting -- //

// -- Mobile Motion Setting -- //
function layoutMotionMobile() {
    // (element, opacity, duration, delay, direction)
    motionY('.l1',1,400,1000,-1);
    motionY('.s1',0,600,1600,-1);
    motionX('.s2',1,400,800,-1);
    motionX('.s3',1,600,500,-1);
    motionX('.s4',0,500,1400,1);
    motionX('.s6',1,400,600,1);
    motionX('.s7',0,600,1200,-1);
    motionX('.s11',1,400,800,1);
    motionY('.s12',0,600,1200,1);
}
// -- Mobile Motion Setting -- //