import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';

@Injectable()
export class IssuesService {
  create(createIssueDto: CreateIssueDto) {
    console.log('Creating issue:', createIssueDto);
    return { message: 'Issue created successfully', issue: createIssueDto };
  }

  findAll() {
    return ['Issue 1', 'Issue 2', 'Issue 3'];
  }
}
