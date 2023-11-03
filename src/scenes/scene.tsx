import {Circle, Img, makeScene2D, Node, Rect, SVG, Txt} from '@motion-canvas/2d';
import {all, beginSlide, cancel, createRef, debug, loop, makeRef, Random, range, useRandom, waitFor} from '@motion-canvas/core';
import waveSvg from '../assets/wave.png';
import colaGreen from '../assets/Coca-Cola_Life_Logo.png';
import nestleGreen from '../assets/nestleGreenWashing.jpg';
import pepsiGreen from '../assets/pep-_logo_fulltagline_global_whitebkgd_2021.png';

import colaLogo from '../assets/colaLogo.png';
import nestleLogo from '../assets/nestleLogo.png';
import pepsiLogo from '../assets/pepsicoLogo.webp';

import recycleable from '../assets/recyclabel.png';
import zitat from '../assets/Zitat.png';
import money from '../assets/money.png';


export default makeScene2D(function* (view) {
  view.fill('white')
  view.fontFamily(`'JetBrains Mono', monospace`).fontWeight(700).fontSize(256);

  const title = createRef<Txt>();
  const backgroundImageWave = createRef<Img>();
  const random = new Random(1);

  const amountBubbles = 50;
  const bubbleColors = ['#FFC66D', '#FF6470', '#99C47A', '#68ABDF'];

  const colaGreenRef = createRef<Img>();
  const nestleGreenRef = createRef<Img>();
  const pepsiGreenRef = createRef<Img>();

  const refBackground = createRef<Rect>();

  view.add(<Img ref={colaGreenRef} src={colaGreen} scale={0} />);
  view.add(<Img ref={nestleGreenRef} src={nestleGreen} scale={0} />);
  view.add(<Img ref={pepsiGreenRef} src={pepsiGreen} scale={0} />);
  colaGreenRef().absolutePosition({x: view.width() / 4 * .9, y: 700});
  pepsiGreenRef().absolutePosition({x: view.width() / 2, y: 700});
  nestleGreenRef().absolutePosition({x: view.width() / 4 * 3.1, y: 700});


  view.add(<Img ref={backgroundImageWave} src={waveSvg} scale={1} />); 

  const bubbles: Circle[] = [];
  const sizes = random.floatArray(amountBubbles, 20, 100);
  view.add(
    range(amountBubbles).map(i => (
      <Circle
        ref={makeRef(bubbles, i)}
        height={sizes[i]}
        width={sizes[i]}
        fill={bubbleColors[random.nextInt(0, bubbleColors.length)]}
        x={random.nextFloat(-800, 800)}
        y={view.height() - random.nextFloat(-view.height() / 2 - 10, view.height() / 2 - 30)}
        opacity={random.nextFloat(0.2, 0.3)}
        />
      ))
  );

  view.add(<Rect ref={refBackground} width={view.width()} height={view.height()} opacity={0} fill='black' />);
  

  const borderRect = createRef<Rect>();
  const colaRect = createRef<Rect>();
  const pepsiRect = createRef<Rect>();
  const nestleRect = createRef<Rect>();
  const nodeStatistics = createRef<Node>();


  view.add(
    <>
      <Rect ref={borderRect} width={1000} height={0} fill='white' radius={40} y={100} opacity={.9}/>
      <Rect ref={colaRect} width={100} height={0} fill='#F40009' radius={10}/>
      <Rect ref={pepsiRect} width={100} height={0} fill='#013F73' radius={10}/>
      <Rect ref={nestleRect} width={100} height={0} fill='#005AA5' radius={10}/>
    </>
  ) 

  view.add(<Txt ref={title} y={0}/>);


  const colaLogoRef = createRef<Img>();
  const nestleLogoRef = createRef<Img>();
  const pepsiLogoRef = createRef<Img>();
  view.add(
    <>
      <Img ref={colaLogoRef} src={colaLogo} scale={0} y={200}/>
      <Img ref={nestleLogoRef} src={nestleLogo} scale={0} y={200} x={200}/>
      <Img ref={pepsiLogoRef} src={pepsiLogo} scale={0} y={200} x={-200}/>
    </>
  )

  const colaText = createRef<Txt>();
  const pepsiText = createRef<Txt>();
  const nestleText = createRef<Txt>();

  view.add(
    <>
      <Txt ref={pepsiText} text='8P' y={96} x={-200} fill='white' fontSize={20} fontFamily='Roboto' opacity={0}/>
      <Txt ref={nestleText} text='8Ne' y={107} x={200} fill='white' fontSize={20} fontFamily='Roboto' opacity={0}/>
      <Txt ref={colaText} text='8C' y={50} fill='white' fontSize={20} fontFamily='Roboto' opacity={0}/>
    </>
  )

  backgroundImageWave().absolutePosition({x: 1500, y: 1580});
  

  title().fontSize(100);
  title().fontFamily('Roboto');
  title().text('Coca-Cola, PepsiCo and Nestlé'.toUpperCase());
  title().fill('black')

  backgroundImageWave().opacity(0.8);
  yield* beginSlide('first slide');

  yield* title().y(-100, 1);
  yield* all(
    colaGreenRef().scale(1, .7),
    pepsiGreenRef().scale(.7, .7),
    nestleGreenRef().scale(.35, .7),
  );

  yield* beginSlide('second slide');

  yield* all(
    backgroundImageWave().absolutePosition({x: 400, y: 550}, 1.5),
    backgroundImageWave().opacity(1, 1),
    title().opacity(1, 1.5),
    title().fill('white', 1.5),
  );

  const loopTask = yield loop(Infinity, () => {
    bubbles.forEach(bubble => {
      bubble.y(bubble.y() - 2);
      if (bubble.y() < - view.height() / 2 - 20) {
        bubble.y(view.height() / 2 + 10);
        bubble.x(random.nextFloat(-800, 800));
      }
    });
  });

  yield* all(
    title().y(0, 1),
    title().text('NOT THAT GREAT AFTER ALL', 1)
  );

  yield* beginSlide('statistics');
  

  colaText().text(`20k pcs`);
  pepsiText().text(`8k pcs`);
  nestleText().text(`4k pcs`);


  const statisticsHeights = 400;

  const maxPackaging = 50_000;
  const amounts = {
    'Coca-Cola': 19_826,
    'PepsiCo': 8_231,
    'Nestlé': 4_149,
  }

  const heights = {
    'Coca-Cola': amounts['Coca-Cola'] / maxPackaging * statisticsHeights,
    'PepsiCo': amounts['PepsiCo'] / maxPackaging * statisticsHeights,
    'Nestlé': (amounts['Nestlé'] / maxPackaging + 0.025) * statisticsHeights,
  }
  
  yield* all(
    title().text('Statistics', 1),
    title().y(-300, 1),
    refBackground().opacity(0.4, 1),
    title().opacity(.9, 1),
  );

  yield* all(
    borderRect().height(550, 1),
  );

  colaRect().absolutePosition({x: view.width() / 2, y: view.height() / 2 + 50});
  pepsiRect().absolutePosition({x: view.width() / 2 - 200, y: view.height() / 2 + 96});
  nestleRect().absolutePosition({x: view.width() / 2 + 200, y: view.height() / 2 + 107});

  yield* beginSlide("Cola werte");

  yield* colaRect().height(heights['Coca-Cola'], .5);
  yield* all(
    colaLogoRef().scale(0.25, .5),
    colaText().opacity(1, .5),
  );

  yield* beginSlide("Pepsi werte");

  yield* pepsiRect().height(heights['PepsiCo'], .5);

  yield* all(
    pepsiLogoRef().scale(0.1, .5),
    pepsiText().opacity(1, .5),
  );

  yield* beginSlide("Nestle Werte");
  yield* nestleRect().height(heights['Nestlé'], .5);

  yield* all(
    nestleLogoRef().scale(0.15, .5),
    nestleText().opacity(1, .5),
  );


  yield* beginSlide("Coca Cola Details");
  
  yield* all(
    borderRect().height(view.height(), 1),
    borderRect().width(view.width(), 1),
    title().opacity(0, 1),
    colaLogoRef().position({x: -view.width() / 2 + 100, y: view.height() / 2 - 75}, 1),
    colaRect().height(0, 1),
    colaText().opacity(0, 1),
    pepsiText().opacity(0, 1),
    nestleText().opacity(0, 1),
    pepsiRect().height(0, 1),
    nestleRect().height(0, 1),
    pepsiLogoRef().opacity(0, 1),
    nestleLogoRef().opacity(0, 1)
  );
  
  yield* all(
    pepsiLogoRef().position({x: -view.width() / 2 + 100, y: view.height() / 2 - 75}, 1),
    nestleLogoRef().position({x: -view.width() / 2 + 100, y: view.height() / 2 - 75}, 1),
  );
  
  const titleSubPage = createRef<Txt>();
  view.add(
    <>
      <Txt ref={titleSubPage} text='"A World Without Waste"' fill='black' fontSize={70} fontFamily='Roboto' opacity={0} textAlign={'center'}/>
    </>
  );
  titleSubPage().y(-330)

  const recyclabel = createRef<Img>();

  view.add(
    <>
      <Img ref={recyclabel} src={recycleable} width={400} y={100} opacity={0}/>
    </>
  )
  yield* titleSubPage().opacity(1, 1);
  
  yield* beginSlide('Cola Show');

  yield* recyclabel().opacity(1, 1);

  yield* beginSlide('Pepsi Show');

  yield* all(
    recyclabel().opacity(0, .5),
    colaLogoRef().opacity(0, .5),
    titleSubPage().text('PepsiCo', 1),
    titleSubPage().y(-450, 1),
    pepsiLogoRef().opacity(1, 1),
    borderRect().y(0, 1),
  )

  yield* beginSlide('Pepsi Details');

  const textPepsiDetails = createRef<Txt>();
  view.add(
    <>
      <Txt ref={textPepsiDetails} text={"..."} fontSize={200} y={-40} x={0} textAlign={'center'}/>
    </>
  )

  yield* textPepsiDetails().opacity(1, .5);
  
  yield* beginSlide('Nestle');

  yield* all(
    textPepsiDetails().opacity(0, .5),
    pepsiLogoRef().opacity(0, .5),
    titleSubPage().text('Nestlé', 1),
    titleSubPage().y(-450, 1),
    nestleLogoRef().opacity(1, 1),
    nestleLogoRef().y(350, 1),
    borderRect().y(-100, 1),
  )

  const zitatRef = createRef<Img>();

  view.add(
    <Img src={zitat} ref={zitatRef} width={1200} opacity={0}/> 
  );

  yield* beginSlide('Nestle Notes');

  yield* zitatRef().opacity(1, .5);

  yield* beginSlide('last slide');
  
  yield* all(
    zitatRef().opacity(0, .5),
    nestleLogoRef().opacity(0, .5),
    titleSubPage().opacity(0, .5),
  );

  yield* borderRect().y(-1200, 1);

  yield* all(
    ...bubbles.map(bubble => bubble.size(0, 1)),
  );
  cancel(loopTask);

  const heading = createRef<Txt>();
  
  view.add(
    <Txt ref={heading} text={"TheSumOfUs"} fill={'white'} fontSize={150} opacity={0}/>
  );
  
  yield* heading().opacity(1, .5);

  yield* heading().y(-400, .5);
  yield* beginSlide('TheSumOfUs')


  const textNew = createRef<Txt>();

  view.add(
    <Txt ref={textNew} text={"$"} fill={'white'} scale={0} y={100}/>
  )

  yield* all(
    textNew().scale(1, .5),
  )

  yield* beginSlide('Thanks for your attention')
  yield* all(
    textNew().scale(0, .5),
    heading().y(0, 1),
    heading().text("Thanks for your Attention", 1),
    heading().fontSize(100, 1),
  );

  yield* waitFor(1);
});