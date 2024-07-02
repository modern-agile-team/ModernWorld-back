// neo4j.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as neo4j from "neo4j-driver";

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  private driver: neo4j.Driver;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.driver = neo4j.driver(
      this.configService.get<string>("NEO4J_URI"),
      neo4j.auth.basic(
        this.configService.get<string>("NEO4J_USERNAME"),
        this.configService.get<string>("NEO4J_PASSWORD"),
      ),
    );
  }

  onModuleDestroy() {
    this.driver.close();
  }

  async runQuery(query: string, parameters: any = {}) {
    const session = this.driver.session();
    try {
      const result = await session.run(query, parameters);
      return result.records;
    } finally {
      await session.close();
    }
  }
}
