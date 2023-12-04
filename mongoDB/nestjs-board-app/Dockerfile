# 노드 17.5.0 이미지 사용
FROM node:20.10.0

# 작업 디렉터리 생성
WORKDIR /app

# 패키지 파일 복사s
COPY package*.json ./

# 패키지 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 앱 빌드
RUN npm run build

# 프로덕션 모드에서 앱 실행
CMD ["npm", "run", "start:dev"]