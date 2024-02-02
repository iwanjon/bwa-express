// id = db.Column(db.Integer, primary_key=True)
// user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
// name = db.Column(db.String(80), nullable=False)
// short_description = db.Column(db.String(80))
// description = db.Column(db.String(80))
// perks = db.Column(db.String(80))
// slug = db.Column(db.String(80))
// backer_count = db.Column(db.Integer)
// goal = db.Column(db.Integer)
// current_amount = db.Column(db.Integer)
// created_at = db.Column(db.DateTime, default=datetime.utcnow )
// updated_at = db.Column(db.DateTime, default=datetime.utcnow )
// campaingimages = db.relationship("CampignImageModel", back_populates = "campaign", lazy = True)
// user = db.relationship("UserModel", back_populates = "campaign", lazy = True)


import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { User } from "./user";
// import {User} from "./user.entity";
// import {Product} from "./product.entity";
// import {Order} from "./order.entity";

@Entity()
export class Campaign extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    userId: number;

    @Column("varchar",{
        length: 50,
    })
    name: string;

    @Column("varchar")
    shortDecription: string;

    @Column("text")
    description: string;

    @Column("varchar",{
        length: 50,
    })
    perks: string;

    @Column("varchar",{
        length: 50,
    })
    slug: string;

    @Column("int")
    bakerCount: number;

    @Column("int")
    goal: number;

    @Column("int")
    currentAmunt: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;


    // @OneToMany(() => CampaignImages, campaignImages => campaignImages.campaign)
    // @JoinColumn({
    //     referencedColumnName: 'campaign_id',
    //     name: 'id'
    // })
    // campaignImages: CampaignImages[];
}

@Entity()
export class CampaignImages{
    @PrimaryGeneratedColumn()
    id:number;

    @Column("int")
    campaignId: number;

    @Column("varchar")
    fileName: string;

    @Column("int")
    isPrimary: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @ManyToOne(() => Campaign)
    @JoinColumn({name: 'campaign_id'})
    campaign: Campaign;

}


// id = db.Column(db.Integer, primary_key=True)
// campaign_id = db.Column(db.Integer, db.ForeignKey("campaigns.id"))
// file_name = db.Column(db.String(80), nullable=False)
// is_primary = db.Column(db.Integer, default=0)
// created_at = db.Column(db.DateTime, default=datetime.utcnow )
// updated_at = db.Column(db.DateTime, default=datetime.utcnow )
// campaign = db.relationship("CampignModel", back_populates = "campaingimages", lazy = True)
