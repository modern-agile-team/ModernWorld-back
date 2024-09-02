import { Module } from "@nestjs/common";
import { UserAchievementsModule } from "./user-achievements/user-achievements.module";
import { LegendsModule } from "./legends/legends.module";
import { AlarmsModule } from "./alarms/alarms.module";
import { ItemsModule } from "./items/items.module";
import { PresentsModule } from "./presents/presents.module";
import { CommentModule } from "./comments/comments.module";
import { CharactersModule } from "./characters/characters.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { CharacterLockerModule } from "./characterLockers/characterLockers.module";
import { AchievementsModule } from "./achievements/achievements.module";
import { LikesModule } from "./likes/likes.module";
import { NeighborsModule } from "./neighbors/neighbors.module";
import { InventoryModule } from "./inventory/inventory.module";
import { UsersModule } from "./users/users.module";
import { GamesModule } from "./games/games.module";
import { BansModule } from "./bans/bans.module";
import { ReportsModule } from "./reports/reports.module";

@Module({
  imports: [
    UserAchievementsModule,
    LegendsModule,
    AlarmsModule,
    ItemsModule,
    PresentsModule,
    CommentModule,
    CharactersModule,
    PostsModule,
    AuthModule,
    CharacterLockerModule,
    AchievementsModule,
    LikesModule,
    NeighborsModule,
    InventoryModule,
    UsersModule,
    GamesModule,
    BansModule,
    ReportsModule,
  ],
})
export class ApiModule {}
