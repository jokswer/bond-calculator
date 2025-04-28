import type TokensRepository from "./tokens.repository.ts";

class BondsRepository {
  private readonly tokensRepository: TokensRepository;

  constructor(tokensRepository: TokensRepository) {
    this.tokensRepository = tokensRepository;
  }
}

export default BondsRepository;
