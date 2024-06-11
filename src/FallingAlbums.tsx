import { Bodies, Engine, Render, Runner, World, Mouse, MouseConstraint } from 'matter-js';
import { memo, useEffect, useRef, type MutableRefObject, type RefObject } from 'react';

interface Props {
  engineRef: MutableRefObject<Engine | undefined>;
  buttonRef: RefObject<HTMLButtonElement | undefined>;
}

function FallingAlbumsComponent({ engineRef, buttonRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !buttonRef.current) return;

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
    const mouseConstraint = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.01, render: { visible: false } } });
    World.add(engine.world, mouseConstraint);

    const buttonPos = buttonRef.current.getBoundingClientRect();

    World.add(engine.world, [
      Bodies.rectangle(
        buttonPos.x + buttonPos.width / 2,
        buttonPos.y + buttonPos.height / 2,
        buttonPos.width,
        buttonPos.height,
        { isStatic: true, render: { visible: false } },
      ),
      Bodies.rectangle(cw / 2, ch - 3, cw, 5, {
        isStatic: true,
        render: { visible: false },
      }),
    ]);

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
  }, [buttonRef, engineRef]);

  return <canvas className="absolute left-0 top-0 -z-0" ref={canvasRef} />;
}

export const FallingAlbums = memo(FallingAlbumsComponent);
FallingAlbums.displayName = 'FallingAlbums';
