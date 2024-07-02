import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Neo4jService } from "./neo4j/neo4j.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly neo4jService: Neo4jService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("check-neo4j")
  async checkNeo4j() {
    try {
      const result = await this.neo4jService.runQuery("RETURN 1");
      return {
        message: "Neo4j is connected",
        result: result.map((record) => record.get(0)),
      };
    } catch (error) {
      return { message: "Neo4j connection failed", error: error.message };
    }
  }
}
