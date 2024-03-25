var t = 0;
var n = 0;
var paths = 0;
var above = 'the sky,radiant,clear,high,bird,bright,sun,horizon'.split(',');
var below = 'flow,water,sand,rock,seaweed,salt,ocean,breeze,grass'.split(',');
var trans = 'collect,pace,splash,dance,frame,sweep,explore,foam'.split(',');
var imper = 'lay,endless,wave,walk,trace,relax,stroll,reflect,reminisce';
imper = imper.split(',');
var intrans = 'linger,dwell,rest,relax,hold,dream,hum,remember'.split(',');
var s = 's,'.split(',');
var texture = 'grainy,damp,sweet'.split(',');

var imageCount = 0;

function rand_range(max) {
    return Math.floor(Math.random() * (max + 1));
}

function choose(array) {
    return array[rand_range(array.length - 1)];
}

function path() {
    var p = rand_range(1);
    var words = choose(above);
    if ((words == 'horizon') && (rand_range(3) == 1)) {
        words = 'fish ' + choose(trans);
    } else {
        words += s[p] + ' ' + choose(trans) + s[(p + 1) % 2];
    }
    words += ' the ' + choose(below) + choose(s) + '.';
    return words;
}

function site() {
    var words = '';
    if (rand_range(2) == 1) {
        words += choose(above);
    } else {
        words += choose(below);
    }
    words += 's ' + choose(intrans) + '.';
    return words;
}

function cave() {
    var adjs = ('encompassing,' + choose(texture) + ',marvelous,serene,glistening,cool,clear,luminous,tranquil,timeless').split(',');
    var target = 1 + rand_range(3);
    while (adjs.length > target) {
        adjs.splice(rand_range(adjs.length), 1);
    }
    var words = '\u00a0\u00a0' + choose(imper) + ' the ' + adjs.join(' ') + ' \u2014';
    return words;
}

function displayImage(side) {
    if (imageCount >= 8) {
        // Remove the oldest image
        const oldestImage = document.querySelector('.image');
        oldestImage.parentNode.removeChild(oldestImage);
        imageCount--;
    }

    const img = document.createElement('img');
    img.src = `sky/${Math.floor(Math.random() * 29)}.jpg`;
    img.classList.add('image');

    let randomY = Math.random() * (window.innerHeight - 300); // Generate a random y-coordinate
    img.style.top = `${randomY}px`; // Set the y-coordinate in pixels

    if (side === 'left') {
        document.getElementById('left-images').appendChild(img);
        img.style.left = '10px'; // Set a fixed left position
    } else {
        document.getElementById('right-images').appendChild(img);
        img.style.right = '10px'; // Set a fixed right position
    }

    imageCount++;
}

function do_line() {
    var main = document.getElementById('main');
    if (t <= 25) {
        t += 1;
    } else {
        main.removeChild(document.getElementById('main').firstChild);
    }

    if (n === 0) {
        text = ' ';
    } else if (n == 1) {
        paths = 2 + rand_range(2);
        text = path();
    } else if (n < paths) {
        text = site();
    } else if (n == paths) {
        text = path();
    } else if (n == paths + 1) {
        text = ' ';
    } else if (n == paths + 2) {
        text = cave();
    } else {
        text = ' ';
        n = 0;
    }
    n += 1;
    text = text.substring(0, 1).toUpperCase() + text.substring(1, text.length);
    if (text.toLowerCase().includes('sky') || text.toLowerCase().includes('sun')) {
        console.log("detected");
        displayImage(imageCount % 2 === 0 ? 'left' : 'right');
    }
    last = document.createElement('div');
    last.appendChild(document.createTextNode(text));
    main.appendChild(last);
}

function poem() {
    setInterval(do_line, 1200);
}
