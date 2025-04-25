import { CustomScene } from '@/types/CumstomScene';
import { StartBattle } from './StartBattle';
import { useGameStore, GameState } from '@/store/gameStore';

// INCOUNTER -> BATTLE -> TRAVELING
export default function RandomEncounter(scene: Phaser.Scene) {
  console.log('RandomEncounter');
  scene.time.delayedCall(
    1000,
    () => {
      console.log('RandomEncounter 1000');
      const encounterTimer = scene.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {
          if (useGameStore.getState().gameState !== GameState.TRAVELING) {
            encounterTimer.remove();
            return;
          }
          const randomTime = Phaser.Math.Between(0, 10);
          console.log('🎲 randomTime', randomTime);
          if (randomTime >= 5) {
            useGameStore.setState({ gameState: GameState.BATTLE });
            encounterTimer.remove();
            StartBattle(scene as CustomScene);
          }
        },
        callbackScope: scene,
      });
    },
    [],
    scene
  );
}
