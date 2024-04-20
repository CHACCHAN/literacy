gsap.fromTo(".fadeAnimateElm", { 
        opacity: 0,
        y: 100,
        rotate: 30,
        scale: 0,
    },
    { 
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 1
});

gsap.fromTo(".fadeAnimateMoveUp", {
        opacity: 0,
        y: 100,
    },
    {
        opacity: 1,
        y: 0,
        duration: 1.5
});