export const myAnimations = {
    home: () => {
        setTimeout(() => {
            gsap.from('#rotateIcon2', {
                duration: 1,
                rotate: -30,
                scale: 0,
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