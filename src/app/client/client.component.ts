import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from './client.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Stats, PlayerStats } from './stat-bar/stats.interface';
import { Player } from '../player/Interface/player.interface';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
    public $stats: Subscription;
    private unsubscribe$ = new Subject<void>();
    public hp: Stats = {
        current: 0,
        max: 0
    };
    public playerStats: PlayerStats = {
        hp: {
            current: 0,
            max: 0
        },
        mana: {
            current: 0,
            max: 0
        },
        moves: {
            current: 0,
            max: 0
        },
        exp: {
            current: 0,
            max: 0
        }
    };
    public $eq: Subscription;
    public eq: string;
    public $inv: Subscription;
    public inv: string;
    public $playerScore: Subscription;
    public playerScore: Player;

    constructor(private clientService: ClientService) { }

    ngOnInit() {
        this.clientService.initHub();
    }

    ngAfterContentInit(): void {

        this.$stats = this.clientService.$stats.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            console.log(x)
            this.playerStats.hp.current = x.hp.current;
            this.playerStats.hp.max = x.hp.max;
            this.playerStats.mana.current = x.mana.current;
            this.playerStats.mana.max = x.mana.max;
            this.playerStats.moves.current = x.moves.current;
            this.playerStats.moves.max = x.moves.max;
            this.playerStats.exp.current = x.exp.current;
            this.playerStats.exp.max = x.exp.max;
        });

        this.$eq = this.clientService.$eq.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            console.log(x)
            this.eq = x;
        });

        this.$inv = this.clientService.$inv.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            console.log(x)
            this.inv = x;
        });

        this.$playerScore = this.clientService.$playerScore.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {

            if (x == null) {
                return;
            }

            this.playerScore = JSON.parse((x as unknown as string)).player;

        });
    }

    ngOnDestroy(): void {
        this.clientService.closeConnection();

    }

}
