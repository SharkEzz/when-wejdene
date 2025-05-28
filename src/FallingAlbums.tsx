import { Bodies, Engine, Mouse, MouseConstraint, Render, Runner, World } from 'matter-js';
import { type MutableRefObject, type RefObject, memo, useEffect, useRef } from 'react';

interface Props {
  engineRef: MutableRefObject<Engine | undefined>;
  buttonRef: RefObject<HTMLButtonElement | undefined>;
  isPast?: boolean;
}

function FallingAlbumsComponent({ engineRef, buttonRef, isPast = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = Engine.create();
    engineRef.current = engine;

    const cw = window.innerWidth;
    const ch = window.innerHeight;

    const render = Render.create({
      engine,
      canvas: canvasRef.current,
      options: {
        width: cw,
        height: ch,
        background: 'transparent',
        wireframes: false,
      },
    });

    const mouse = Mouse.create(canvasRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.01, render: { visible: false } },
    });
    World.add(engine.world, mouseConstraint);

    const buttonPos = buttonRef.current?.getBoundingClientRect();
    const worldItems = [];
    if (!isPast && buttonPos) {
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
    worldItems.push(
      Bodies.rectangle(cw / 2, ch - 3, cw, 5, {
        isStatic: true,
        render: { visible: false },
      }),
    );

    World.add(engine.world, worldItems);
    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    Render.lookAt(render, { min: { x: 0, y: 0 }, max: { x: cw, y: ch } });

    return () => {
      Runner.stop(runner);
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [buttonRef, engineRef, isPast]);

  return <canvas className="absolute left-0 top-0 -z-0" ref={canvasRef} />;
}

export const FallingAlbums = memo(FallingAlbumsComponent);
FallingAlbums.displayName = 'FallingAlbums';
