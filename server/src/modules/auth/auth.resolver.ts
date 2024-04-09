import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/inputs/signup.input';
import { SignResponse } from './dto/responseTypes/sign.response';
import { SignInInput } from './dto/inputs/signin.input';
import { LogoutResponse } from './dto/responseTypes/logout.response';
import { Public } from './decorators/public.decorator';
import { CurrentUserId } from './decorators/currentUserId.decorator';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SignResponse)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Public()
  @Mutation(() => SignResponse)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Mutation(() => LogoutResponse)
  async logout(@Args('userId', { type: () => String }) userId: string) {
    return this.authService.logout(userId);
  }

  @Query(() => String)
  async hello(@CurrentUser('email') email: string) {
    return `Hello ${email}`;
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => SignResponse)
  async getNewTokens(@CurrentUserId() userId: string, @CurrentUser('refreshToken') refreshToken: string) {
    return this.authService.getNewTokens(userId, refreshToken);
  }
}
