// import styled from '@emotion/styled';
import {Container, Contents, BoxShadow, Title, WrapForm, WrapInp, Inp, InpLabel, TextArea, Button, ButtonGroup, FileBox, FileUpLoad, BgChk, Radio, Label} from '../../../styles/emotion.js'

export default function boardUpLoadPage() {

	return (
		<Container>
			<Contents>
				<BoxShadow>
					<Title>게시물 등록</Title>
					<WrapForm className={'col'}>
						<WrapInp>
							<InpLabel>작성자</InpLabel>
							<Inp type='text' title='작성자를 입력' placeholder='이름을 입력해주세요.' />
						</WrapInp>

						<WrapInp>
							<InpLabel>비밀번호</InpLabel>
							<Inp type='password' title='비밀번호를 입력해주세요.' placeholder='비밀번호를 입력해주세요..' />
						</WrapInp>
					</WrapForm>

					<WrapForm>
						<InpLabel>제목</InpLabel>
						<Inp type='text' title='제목을 작성' placeholder='제목을 작성해주세요.' />
					</WrapForm>

					<WrapForm>
						<InpLabel>내용</InpLabel>
						<TextArea cols='' rows='' title='내용을 작성해주세요.' placeholder='내용을 작성해주세요.'></TextArea>
					</WrapForm>

					<WrapForm className={'address'}>
						<InpLabel>주소</InpLabel>
						<WrapInp className={'col'}>
							<Inp type='number' title='우편번호 입력' placeholder='07250' readOnly />
							<Button type='button' className={'black small'}>우편번호 검색</Button>
						</WrapInp>

						<Inp type='text' title='주소를 입력해주세요.' placeholder='주소를 입력해주세요.' readOnly />
						<Inp type='text' title='상세주소 입력해주세요.' placeholder='상세주소 입력해주세요.' />
					</WrapForm>

					<WrapForm>
						<InpLabel>유튜브</InpLabel>
						<Inp type='text' title='유튜브 링크 복사' placeholder='링크를 복사해주세요.' />
					</WrapForm>

					<WrapForm>
						<InpLabel>사진 첨부</InpLabel>
						<FileBox className={'col'}>
							<div className={'wrap-file'}>
								<FileUpLoad type='file' title='사진 첨부' id='file_upload_0' />
								<label for='file_upload_0'></label>
							</div>

							<div className={'wrap-file'}>
								<FileUpLoad type='file' title='사진 첨부' id='file_upload_1' />
								<label for='file_upload_1'></label>
							</div>

							<div className={'wrap-file'}>
								<FileUpLoad type='file' title='사진 첨부' id='file_upload_2' />
								<label for='file_upload_2'></label>
							</div>
						</FileBox>
					</WrapForm>

					<WrapForm>
						<InpLabel>메인 설정</InpLabel>
						<BgChk>
							<Radio type='radio' name='radio-01' id='radio-01-01' checked />
							<label for='radio-01-01'>유튜브</label>
						</BgChk>

						<BgChk>
							<Radio type='radio' name='radio-01' id='radio-01-02' />
							<label for='radio-01-02'>사진</label>
						</BgChk>
					</WrapForm>

					<ButtonGroup>
						<Button type='button' className={'yellow'}>등록하기</Button>
					</ButtonGroup>

				</BoxShadow>
			</Contents>
		</Container>
	)
}