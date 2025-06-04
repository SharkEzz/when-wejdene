import { Bodies, type Body, Engine, Mouse, MouseConstraint, Render, Runner, World } from 'matter-js';
import type { RefCallback, RefObject } from 'react';
import { checkIsPast } from './constants.ts';

export function FallingAlbums({
  engineRef,
  buttonRef,
}: {
  engineRef: RefObject<Engine>;
  buttonRef: RefObject<HTMLButtonElement | null>;
}): React.JSX.Element {
  const handleFallingAlbum: RefCallback<HTMLCanvasElement> = (canvas) => {
    if (!canvas) return;

    const engine = engineRef.current;
    const world = engine.world;

    const cw = window.innerWidth;
    const ch = window.innerHeight;

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.01, render: { visible: false } },
    });
    World.add(world, mouseConstraint);

    const worldItems: Body[] = [
      Bodies.rectangle(cw / 2, ch - 3, cw, 5, {
        isStatic: true,
        render: { visible: false },
      }),
    ];
    const buttonPos = buttonRef.current?.getBoundingClientRect();
    if (buttonPos && !checkIsPast()) {
      worldItems.push(
        Bodies.rectangle(
          buttonPos.x + buttonPos.width / 2,
          buttonPos.y + buttonPos.height / 2,
          buttonPos.width,
          buttonPos.height,
          { isStatic: true, render: { visible: false } },
        ),
      );
    }

    World.add(world, worldItems);

    const render = Render.create({
      canvas,
      engine,
      options: {
        width: cw,
        height: ch,
        background: 'transparent',
        wireframes: false,
      },
    });

    Render.run(render);
    Render.lookAt(render, { min: { x: 0, y: 0 }, max: { x: cw, y: ch } });

    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Runner.stop(runner);
      Render.stop(render);
      World.clear(world, false);
      Engine.clear(engine);
    };
  };

  return <canvas className="absolute left-0 top-0 -z-0" ref={handleFallingAlbum} />;
}
