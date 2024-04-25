const myAnimations = () => {
    return {
        init: () => {
            gsap.config({
                nullTargetWarn: false
            });
        },
        home: () => {
            setTimeout(() => {
                gsap.from('#titleIn', {
                    duration: 1,
                    y: 30,
                    opacity: 0,
                    ease: 'none',
                    stagger: .5,
                });

                gsap.from('#buttonScaleIn', {
                    duration: 1,
                    scale: 1.2,
                    ease: 'none',
                });
            }, 10);
        },
        about: () => {
            setTimeout(() => {
                gsap.from('#rotateIcon', {
                    duration: 2,
                    rotate: -100,
                    x: 200,
                    opacity: 0,
                    onComplete: () => {
                        gsap.fromTo('#rotateIcon', 
                            {
                                y: 0,
                            },
                            {
                                y: 10,
                                ease: 'power1.inOut',
                                stagger: {
                                    each: 5,
                                    repeat: -1,
                                    yoyo: true
                                }
                            });
                    }
                });

                gsap.from('#fadeIn', {
                    duration: 1,
                    y: Math.floor(Math.random() * 200),
                    opacity: 0,
                    ease: 'none',
                    stagger: .5,
                });
            }, 10);
        }
    }
}

export default myAnimations;