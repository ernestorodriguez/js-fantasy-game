import Lineup from "../lib/lineup";
import Player from "../lib/player";
import QB from "../lib/positions/QB";
import RB from "../lib/positions/RB";

describe('Fantasy Game', () => {
    it('the user should be enable create a FL lineUp and add players', () => {
        const lineUp = new Lineup([
            new QB(),
        ]);
        const player = new Player({
            name: 'A',
            position: QB
        });
        lineUp.add(player)
        expect(lineUp.toObject()).toEqual({ positions:[{
            name: 'QB',
            player: 'A',
        }]});
    });
    
    it('shouldn\'t add players to assigned positions', () => {
        const lineUp = new Lineup([
            new QB(),
        ]);
        const playerA = new Player({
            name: 'A',
            position: QB
        });
        const playerB = new Player({
            name: 'B',
            position: QB
        });
        lineUp.add(playerA);
        lineUp.add(playerB);
        expect(lineUp.toObject()).toEqual({ positions:[{
            name: 'QB',
            player: 'A'
        }]})
    });

    it('shouldn\'t add the same player to Other position', () => {
        const lineUp = new Lineup([
            new RB(),
            new RB(),
        ]);
        const player = new Player({
            name: 'A',
            position: RB
        });
        lineUp.add(player);
        lineUp.add(player);
        expect(lineUp.toObject()).toEqual(
        { positions:[
            {
                name: 'RB',
                player: 'A',
            },
            {
                name: 'RB'
            },
        ]});
    });
})