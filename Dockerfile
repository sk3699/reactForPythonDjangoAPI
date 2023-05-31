FROM node:alpine
RUN echo "after from"
WORKDIR /app
RUN echo "in working dir"
COPY . /src
RUN echo "code copied"
RUN npm run build
RUN echo "build done"
EXPOSE 8082
RUN echo "expose done"
CMD ["npx","serve","build"]
RUN echo "at last"
