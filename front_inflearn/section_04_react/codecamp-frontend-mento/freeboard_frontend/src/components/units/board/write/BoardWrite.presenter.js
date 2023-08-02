import * as S from "./BoardWrite.styles"

export default function BoardWriteUI(props) {
	return (
		<S.Container>
			<S.Contents>
				<S.BoxShadow>
					<S.Title>게시물 등록</S.Title>
					<S.WrapForm className={'col'}>
						<S.WrapInp>
							<S.InpLabel>작성자</S.InpLabel>
							<S.Inp type='text' title='작성자를 입력' placeholder='이름을 입력해주세요.' onChange={props.onChangeValue} />
							<S.Error>{props.errorWriter}</S.Error>
						</S.WrapInp>

						<S.WrapInp>
							<S.InpLabel>비밀번호</S.InpLabel>
							<S.Inp type='password' title='비밀번호를 입력해주세요.' placeholder='비밀번호를 입력해주세요..' onChange={props.onChangeValue} />
							<S.Error>{props.errorPassword}</S.Error>
						</S.WrapInp>
					</S.WrapForm>

					<S.WrapForm>
						<S.InpLabel>제목</S.InpLabel>
						<S.Inp type='text' title='제목을 작성' placeholder='제목을 작성해주세요.' onChange={props.onChangeValue} />
						<S.Error>{props.errorTtitle}</S.Error>
					</S.WrapForm>

					<S.WrapForm>
						<S.InpLabel>내용</S.InpLabel>
						<S.TextArea cols='' rows='' title='내용을 작성해주세요.' placeholder='내용을 작성해주세요.' onChange={props.onChangeValue}></S.TextArea>
						<S.Error>{props.errorContents}</S.Error>
					</S.WrapForm>

					<S.WrapForm className={'address'}>
						<S.InpLabel>주소</S.InpLabel>
						<S.WrapInp className={'col'}>
							<S.Inp type='number' title='우편번호 입력' placeholder='07250' readOnly />
							<S.Button type='button' className={'black small'}>우편번호 검색</S.Button>
						</S.WrapInp>

						<S.Inp type='text' title='주소를 입력해주세요.' placeholder='주소를 입력해주세요.' readOnly />
						<S.Inp type='text' title='상세주소 입력해주세요.' placeholder='상세주소 입력해주세요.' />
					</S.WrapForm>

					<S.WrapForm>
						<S.InpLabel>유튜브</S.InpLabel>
						<S.Inp type='text' title='유튜브 링크 복사' placeholder='링크를 복사해주세요.' />
					</S.WrapForm>

					<S.WrapForm>
						<S.InpLabel>사진 첨부</S.InpLabel>
						<S.FileBox className={'col'}>
							<div className={'wrap-file'}>
								<S.FileUpLoad type='file' title='사진 첨부' id='file_upload_0' />
								<label for='file_upload_0'></label>
							</div>

							<div className={'wrap-file'}>
								<S.FileUpLoad type='file' title='사진 첨부' id='file_upload_1' />
								<label for='file_upload_1'></label>
							</div>

							<div className={'wrap-file'}>
								<S.FileUpLoad type='file' title='사진 첨부' id='file_upload_2' />
								<label for='file_upload_2'></label>
							</div>
						</S.FileBox>
					</S.WrapForm>

					<S.WrapForm>
						<S.InpLabel>메인 설정</S.InpLabel>
						<S.BgChk>
							<S.Radio type='radio' name='radio-01' id='radio-01-01' checked />
							<label for='radio-01-01'>유튜브</label>
						</S.BgChk>

						<S.BgChk>
							<S.Radio type='radio' name='radio-01' id='radio-01-02' />
							<label for='radio-01-02'>사진</label>
						</S.BgChk>
					</S.WrapForm>

					<S.ButtonGroup>
						<S.Button type='button' className={'yellow'} onClick={props.onClickSubmit}>등록하기</S.Button>
					</S.ButtonGroup>

				</S.BoxShadow>
			</S.Contents>
		</S.Container>
	)
}