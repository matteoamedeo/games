const container = document.querySelector('#container');

function createParticles(n) {

    // let allParticles = [];
    for (let i = 1; i <= n; i++) {
        let particleContainer = document.createElement('div');
        particleContainer.classList.add('particles');
        let randomTop = (Math.random() * 100).toFixed();
        let randomleft = (Math.random() * 100).toFixed();
        particleContainer.style.top = `calc(${randomTop}vh - 50px)`;
        particleContainer.style.left = `calc(${randomleft}vw - 50px)`;

        let particle = `<div class="rotate">
            <div class="angle">
                <div class="size">
                    <div class="position">
                        <div class="pulse">
                            <div class="particle">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="angle">
                <div class="size">
                    <div class="position">
                        <div class="pulse">
                            <div class="particle">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="angle">
                <div class="size">
                    <div class="position">
                        <div class="pulse">
                            <div class="particle">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        particleContainer.innerHTML += particle;
        container.appendChild(particleContainer)
    }
}
createParticles(10);


function moveParticles() {
    const particles = Array.from(document.querySelectorAll('.particles'));
    particles.forEach(p => {
        let randomTop = (Math.random() * 100).toFixed();
        let randomleft = (Math.random() * 100).toFixed();
        p.style.top = `calc(${randomTop}vh - 50px)`;
        p.style.left = `calc(${randomleft}vw - 50px)`;
    });
}
const moveParticlesInt = setInterval(moveParticles, 5000);
