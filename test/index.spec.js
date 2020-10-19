import Lineup from "../lib/lineup";
import Player from "../lib/player";
import QB from "../lib/positions/QB";
import RB from "../lib/positions/RB";
import FLEX from "../lib/positions/FLEX";
import WR from "../lib/positions/WR";
import TE from "../lib/positions/TE";
import DST from "../lib/positions/DST";

describe('Fantasy Game', () => {
    it('the user should be enable create a FL lineUp and add players', () => {
        const lineUp = new Lineup([
            new QB(),
            new RB(),
            new WR(),
            new TE(),
            new FLEX(),
            new DST(),
        ]);
        const playerA = new Player({
            name: 'A',
            position: QB
        });
        const playerB = new Player({
            name: 'B',
            position: RB
        });
        const playerC = new Player({
            name: 'C',
            position: WR
        });
        const playerD = new Player({
            name: 'D',
            position: TE
        });
        const playerE = new Player({
            name: 'E',
            position: RB
        });
        const playerF = new Player({
            name: 'F',
            position: DST
        });
        
        lineUp.add(playerA);
        lineUp.add(playerB)
        lineUp.add(playerC)
        lineUp.add(playerD)
        lineUp.add(playerE)
        lineUp.add(playerF)

        expect(lineUp.toObject()).toEqual({ 
            positions:[
                {
                    name: 'QB',
                    player: 'A',
                },
                {
                    name: 'RB',
                    player: 'B',
                },
                {
                    name: 'WR',
                    player: 'C',
                },
                {
                    name: 'TE',
                    player: 'D',
                },
                {
                    name: 'FLEX',
                    player: 'E',
                },
                {
                    name: 'DST',
                    player: 'F',
                },
            ]
        });
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
        const playerC = new Player({
            name: 'C',
            position: RB
        });
        
        lineUp.add(playerA);
        lineUp.add(playerB);
        lineUp.add(playerC);
        
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

    describe('should possible to assign only RB, WR and TE players on FLEX position', () => {
       it('QB and DST', () => {
            const lineUp = new Lineup([
                new FLEX(),
            ]);
            const playerA = new Player({
                name: 'A',
                position: QB
            });
           const playerB = new Player({
               name: 'A',
               position: DST
           });
            
            lineUp.add(playerA);
            expect(lineUp.toObject()).toEqual(
                { positions:[
                    {
                        name: 'FLEX',
                    },
            ]});
        });
        it('RB', () => {
            const lineUp = new Lineup([
                new FLEX(),
            ]);
            const playerA = new Player({
                name: 'A',
                position: RB
            });
            
            lineUp.add(playerA);
            expect(lineUp.toObject()).toEqual(
            { positions:[
                    {
                        name: 'FLEX',
                        player: 'A',
                    },
            ]});
        });
        it('WR', () => {
            const lineUp = new Lineup([
                new FLEX(),
            ]);
            const playerA = new Player({
                name: 'A',
                position: WR
            });

            lineUp.add(playerA);
            expect(lineUp.toObject()).toEqual(
                { positions:[
                        {
                            name: 'FLEX',
                            player: 'A',
                        },
                    ]});
        });
        it('TE', () => {
            const lineUp = new Lineup([
                new FLEX(),
            ]);
            const playerA = new Player({
                name: 'A',
                position: TE
            });

            lineUp.add(playerA);
            expect(lineUp.toObject()).toEqual(
                { positions:[
                        {
                            name: 'FLEX',
                            player: 'A',
                        },
                    ]});
        });
    });
})