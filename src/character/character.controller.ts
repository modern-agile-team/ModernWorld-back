import { Controller } from "@nestjs/common";
import { CharacterService } from "./character.service";

@Controller("character")
export class CharacterController {
  constructor(private readonly characterServcie: CharacterService) {}
}
